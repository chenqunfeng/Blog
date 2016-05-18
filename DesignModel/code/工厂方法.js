/*
    实现类继承功能
    调用方式
    _extends(child,parent)
*/
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) {
    for (var key in parent) {
        if (__hasProp.call(parent, key))
            child[key] = parent[key]; 
    } 
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
}

/*
    op:运算符类
*/
var op = (function(){
    
    function op(){
        console.log("op create");
        this.number1 = 0;
        this.number2 = 0;
    };

    op.prototype.getResult = function(){

    }

    return op;
})()

/*
    继承op类的加法类
*/
var add = (function(_super){

    __extends(add, _super);
    
    function add(){
        console.log("add create")
    };

    add.prototype.getResult = function(){
        result = this.number1 + this.number2;
        console.log("加法结果:",result);
    };

    return add;

})(op)

/*
    opFactory:高级工厂类
*/
var opFactory = (function(){
    
    function opFactory(){
        console.log("opFactory create");
    };

    opFactory.prototype.createOperation = function(){};

    return opFactory;

})()
/*
    addFactory:加法工厂
*/
var addFactory = (function(_super){

    __extends(addFactory, _super);

    function addFactory(){
        console.log("addFactory create");
    };

    addFactory.prototype.createOperation = function(){
        return new add();
    };

    return addFactory;

})(opFactory)

/*
    client: 客户端类
*/
var client = (function(){

    function client(){
        console.log("client create");
    };

    client.prototype.main = function(){

        add = new addFactory().createOperation();
        add.number1 = 1;
        add.number2 = 2;
        add.getResult();

    };

    return client;
})()

cl = new client()
cl.main()