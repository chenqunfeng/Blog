##
# 数据源
# @Author cqf
# @Update 2016-06-03
##

# 数据源
class Data
    # 构造函数
    constructor: ->
        @originConfig = null
        @userConfig = null
        # 数据源名称
        @name = ""

        @READY = "ready"
        @PENDING = "pending"
        @OK = "ok"

        # 配置修改标志
        @isEdited = false
        # 保存队列
        @saveQueue = {}
        @onceQueue = {}
        # 类型表
        @typeRule =
            "key_value": "string"
            "attributes":
                "position":
                    "x": "number"
                    "y": "number"
                "size":
                    "width": "number"
                    "height": "number"
        # 映射表
        @mappingTable = {}
        @createMapping @typeRule

    # 根据配置键获取元配置
    # 元配置即最小的配置对象，子属性包括通用的attributes等
    # 可由子类根据数据格式进行重载
    ### 
        {
            "GAME.title.attributes.position.x": 2
            "GAME.title.attributes.position": {x:2,y:2}
        }
            ###
    getMetaConfig: (key, config) ->

        result    = undefined
        lastKey   = undefined
        parent    = undefined
        reference = undefined
        unit      = undefined

        result = config or @userConfig
        #if (result = config) and start
        #    result = config[start]

        reference = @typeRule
        lastKey = ''

        typeof key is "string" and (
            keyArray = key.split('.')
            len = keyArray.length
            )

        if len > 10
            return null

        keyArray.map (index, i) =>
            result = result[index]

            # 索引结果
            if undefined is result or null is result
                return false

            # 索引直接父级
            if len - 2 is i 
                parent = result
            # 末尾键
            if len - 1 is i
                lastKey = index
            # 类型参照表
            if reference[index] isnt undefined
                reference = reference[index]
            # status变更
            if result.key_value isnt undefined
                unit = result

        ###
            result:   索引结果
            parent:   索引直接父级
            lastKey:  末尾键
            reference:类型参照表
            reason:
                假设:
                    userConfig:
                        title:
                            attributes:
                                position:
                                    x:2
                若key:"GAME.title.attributes.position.x"
                则result //2
                令result = 3,不会令userConfig中x位置的值改变
                故再传递其父级(object),让result不为object的情况下可以借助parent来完成更新
            ###
        if undefined isnt result or null isnt result
            return {
                result:    result
                parent:    parent
                lastKey:   lastKey
                reference: reference
                unit:      unit 
            }
        return null

    # 解析获取数据的索引
    analysisKey: (key)->
        if "string" is typeof key
            keyArr = key.split(".")
            if @name is keyArr[0]
                keyArr.shift()
                if 0 is keyArr.length
                    return false
            start = keyArr[0]
            if not (/^(scenes|stage|items)$/).test(start)
                keyArr.unshift("items")
            return keyArr.join(".")
        return false

    # 根据配置设置对应的配置
    # @param {data}   data 配置
    ###
        data = {
            "title":{
                "position.x":2,
                "size":{
                    "width":200,
                    "height":200
                }
            }
        }
        转化为====>
        "title.attributes.position.x":2
        "title.attributes.size":{"width":200,"height":200}
        ###
    setValueByKey: (data) ->
        for key of data
            _data = data[key]
            for _key of _data
                value = _data[_key]
                name = key + "." + (@mappingTable[_key] || _key)
                name = @analysisKey(name)
                # 压入更新项到对象中
                @onceQueue[name] = @READY
                config = @getMetaConfig(name)
                if config.unit
                    config.unit.status = @READY
                # 若类型相等
                if typeof config.result is typeof value
                    @parseObject(
                        config.result,
                        value,
                        {
                            lastKey:  config.lastKey
                            parent:   config.parent
                            reference:config.reference
                        }
                    )

            @isEdited = true
        return @

    # 更新userConfig
    # @param {object} origin      被动数据源
    # @param {object} user        主动数据源
    # @param {string} additional  键值依赖
    ###
        additional:{
            lastKey:  lastKey   // 键
            parent:   parent    // 被动数据源上一级对象
            reference:reference // 规则表
        }
        ###
    parseObject: (origin, user, additional) ->

        oType     = typeof origin
        uType     = typeof user
        additional and (
            lastKey   = additional["lastKey"]
            parent    = additional.parent
            reference = additional.reference
            )
            
        # origin与user类型不匹配
        if oType isnt uType
            rType = reference
            if uType is rType 
                parent[lastKey] = user
            else if typeof rType is "object" and uType is typeof rType
                parent[lastKey] = Common.clone(user)

        # 更新origin对应值
        else if oType isnt "object"
            parent[lastKey] = user

        # 遍历
        else
            for key of user
                oValue = origin[key]
                uValue = user[key]
                if reference && reference[key]
                    reference = reference[key]
                @parseObject(oValue, uValue, {
                    lastKey:  key
                    parent:   origin
                    reference:reference
                    })
                reference = additional.reference

    # 映射表生成
    # @param {object} config 映射表依赖
    # @param {string} parent 父级
    # 无返回
    createMapping: (config, parent) ->
        parent = parent and parent + "." or ""
        last = (
            t = parent.split(".")
            t[t.length - 2]
        )
        last = last and last + "." or ""
        for key of config
            value = config[key]
            type = typeof value
            if "string" is type
                @mappingTable[last + key] = parent + key
            else if "object" is type
                @mappingTable[key] = parent + key
                @createMapping(config[key], parent + key) 

module.exports = Data
