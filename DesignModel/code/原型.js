/*
    实现类继承功能
    调用方式
    __extends(child,parent)
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

var Prototype = (function(){

    function Prototype(){
        console.log("Prototype create");
    };

    Prototype.prototype.clone = function(){};

    return Prototype;
})()

var ConcretePrototype1 = (function(_super){

    __extends(ConcretePrototype1, _super);

    function ConcretePrototype1(){
        console.log("ConcretePrototype1 create");
    };

    ConcretePrototype1.prototype.clone = function(){

    }

})(Prototype)

/*
    client: 客户端类
*/
var client = (function(){

    function client(){
        console.log("client create");
    };

    client.prototype.main = function(){

        ConcretePrototype1 a1 = new ConcretePrototype1("I");
        ConcretePrototype1 a2 = a1.clone();

    };

    return client;
})()

cl = new client()
cl.main()