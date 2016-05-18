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

var Builder = (function(){

    function Builder(){
        console.log("Builder create");
    };

    Builder.prototype.buildPart1 = function(){};

    Builder.prototype.buildPart2 = function(){};

    return Builder;

})()

var Product = (function(){

    function Product(){
        console.log("Product create");
        this.init();
    };

    Product.prototype.init = function(){
        this.parts = [];
    };

    Product.prototype.add = function(part){
        this.parts.push(part);
    };

    Product.prototype.show = function(){
        console.log("产品 创建---");
        len = this.parts.length;
        for (var i = 0; i < len; i++) {
            console.log(this.parts[i]);
        }
        console.log("------------");
    };

    return Product;
})()

var ConcreteBuilder = (function(_super){

    __extends(ConcreteBuilder, _super);

    function ConcreteBuilder(){
        console.log("ConcreteBuilder create");
        this.init();
    };

    ConcreteBuilder.prototype.init = function(){
        this.product = new Product();
    };

    ConcreteBuilder.prototype.buildPart1 = function(){
        this.product.add("部件A");
    };

    ConcreteBuilder.prototype.buildPart2 = function(){
        this.product.add("部件B");
    };

    ConcreteBuilder.prototype.getResult = function(){
        return this.product;
    };

    return ConcreteBuilder;

})(Builder)

var Director = (function(){

    function Director(){
        console.log("Director create");
    };

    Director.prototype.constructor = function(builder){
        if(builder instanceof Builder){
            builder.buildPart1();
            builder.buildPart2();
        }
    };

    return Director;

})()

/*
    client: 客户端类
*/
var client = (function(){

    function client(){
        console.log("client create");
    };

    client.prototype.main = function(){

        director = new Director();
        b1 = new ConcreteBuilder();
        director.constructor(b1);
        b1.getResult().show();

    };

    return client;
})()

cl = new client();
cl.main();
delete(cl);