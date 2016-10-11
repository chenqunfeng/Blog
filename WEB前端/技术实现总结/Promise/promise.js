//参考连接http://liubin.org/promises-book/#chapter2-how-to-write-promise
var isFun = function(fn){
    return fn && typeof fn == "function";
}
var isThenable = function(obj){
    return obj && typeof obj["then"] == "function";
}
var isArray = function(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
}
var Promise = function(resolver){
    /*
        第一个promise的resolver必须为function
    */
    if (!isFun(resolver)){
        throw new TypeError('The first promise resolver must be resolver');
    }
    /*
        若当前this环境不为promise对象,则新建一个Promise对象并返回
    */
    if(!(this instanceof Promise)){
        return new Promise(resolver);
    }
    /*
        @param {any}    _value    成功回调值
        @param {any}    _error   失败回调值
        @param {string} _status   当前promise状态
                                  (
                                      PENDING:挂起,
                                      RESOLVED:接受,
                                      REJECT:拒绝
                                  )
        @param {array}  _resolves 成功回调函数集合
        @param {array}  _rejects  失败回调函数集合
    */
    var promise = this;
    promise._value;
    promise._error;
    promise._status = "PENDING";
    promise._resolves = [];
    promise._rejects = [];

    var resolve = function(value){
        var fn;
        while(fn = promise._resolves.shift()){
            // 若函数有返回值,则缓存该返回值,不然缓存前一个的值
            value = fn.call(promise, value) || value;
        }
        promise._value = value;
        promise._resolves = undefined;
        promise._rejects = undefined;
    };
    var reject = function(error){
        var fn;
        while(fn = promise._rejects.shift()){
            error = fn.call(promise, error) || error;
        }
        promise._error = error;
        promise._resolves = undefined;
        promise._rejcts = undefined;
    };
    resolver(resolve,reject);
}
Promise.prototype.then = function(onResolved,onRejected){
    var promise = this;
    return Promise(function(resolve,reject){
        // 成功回调
        function sCb(value){
            /*
                r获取过程分析 =>
                    1.先判断onResolved是否为函数,
                        若满足,则判断onResolved是否存在返回值
                            否则 转向2
                        若不满足,转向2
                    2.获取上一个promise传下来的value
            */
            var r = isFun(onResolved) && onResolved(value) || value;
            /*
                分支过程分析 =>
                    1.若返回值为一个函数,则为其构造一个then的结构来执行resolve和reject过程
                    2.若返回值为一个值,则直接resolve即可
            */
            if (isThenable(r)){
                r.then(function(value){
                    resolve(value);
                },function(error){
                    reject(error);
                })
            } else {
                resolve(r);
            }
        }
        // 失败回调
        function eCb(error){
            // 该处的分析与sCb中的一致
            var e = isFun(onRejected) && onRejected(error) || error;
            reject(error);
        }
        // 状态判断
        var _status = promise._status;
        if (_status === "PENDING"){
            promise._resolves.push(sCb);
            promise._rejects.push(eCb);
        } else if (_status === "RESOLVED"){
            sCb(promise._value);
        } else if (_status === "REJECTED"){
            eCb(promise._error);
        }
    })
}
Promise.prototype.all = function(promises){
    /*
        从整体上看,all的功能与then相差无几,它们都有以下两点共同点:
        1.返回一个promise对象
        2.都会执行resolve来进入下一条语句
    */
    /*
        先对参数进行约束,对不符合参数的情况进行异常抛出
    */
    if (!isArray(promises)) {
        throw new TypeError('You must pass an array to all.');
    }
    return Promise(function(resolve,reject){
        var result = [];

        function resolver(index) {
            /*
                这里需要返回一个闭包,来维持index和result的状态
                value的获取是resolver的回调函数返回的参数
            */
            return function(value) {
                result[index] = value;
                /*
                    通过数量标识来延后真正的all的resolve
                */
                index === len - 1 && resolve(result);
            };
        }

        function rejecter(reason){
            reject(reason);
        };

        for (var i = 0, len = promises.length; i < len; i++) {
            // 通过使用一个then来获取到promises中每一个的返回结果,最后再统一处理
            promises[i].then(resolver(i),rejecter);
        }
    });
}
Promise.prototype.catch = function(onRejected){
    return this.then(undefined, onRejected)
}
/*
    //调用案例
    function test1(){
        return Promise(function(resolve,reject){
            setTimeout(function(){
                resolve("1s过去了~");
            },1000);
        })
    }
    function test2(){
        return Promise(function(resolve,reject){
            setTimeout(function(){
                resolve("2s过去了~");
            },2000)
        })
    }
    //样例1
    test1().then(function(data){
        console.log(data);
        return "第一个then";
    }).then(function(data){
        console.log(data);
        return "第二个then";
    }).then(function(data){
        console.log(data);
    })
    //样例2
    test1().then(function(data){
        console.log(data);
        return test2();
    }).then(function(data){
        console.log(data);
        return "第二个then";
    }).then(function(data){
        console.log(data);
    })
    */
