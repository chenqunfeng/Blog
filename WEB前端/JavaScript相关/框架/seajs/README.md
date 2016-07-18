seajs(seajs全局对象下的属性和方法)
    Module: function Module(uri, deps)
    cache: Object
        存放require的模块缓存
    data: Object
        配置项数据
        base: 默认为seajs所在的路径，可通过config配置
        charset: 字符编码
        cid: 生成唯一标识码函数
        cwd: 默认与base一致
        dir: 默认与base一致
        events: 
        fetchedList: 加载的模块列表
        loader: 已经加载的模块
    emit: function(name, data)
        发布事件
    off: function(name, callback)
        取消事件
    on: function(name, callback)
        订阅事件
    request: function request(url, callback, charset, crossorigin)
        资源下载函数
    require: function(id)
        模块包含函数
    resolve: function id2Uri(id, refUri)
        对id执行一系列的转换，如一般会添加.js后缀
        再调用addBase()，返回根据id生成的寻址链接uri
        返回uri
    use: function (ids, callback)
        调用Module.use
        执行Module.get
        执行Module.load