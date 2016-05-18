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

var HandsetSoft = (function(){

    function HandsetSoft(){
        console.log("HandsetSoft create");
    };

    HandsetSoft.prototype.runSoft = function(){};

    return HandsetSoft;
})()

var AddressList = (function(_super){

    __extends(AddressList, _super);

    function AddressList(){
        console.log("AddressList create");
    };

    AddressList.prototype.runSoft = function(){
        console.log("AddressList run");
    };

    return AddressList;
})(HandsetSoft)

var HandGame = (function(_super){

    __extends(HandGame, _super);

    function HandGame(){
        console.log("HandGame create");
    };

    HandGame.prototype.runSoft = function(){
        console.log("HandGame run");
    };

    return HandGame;
})(HandsetSoft)

var HandsetBrand = (function(){

    function HandsetBrand(){
        console.log("HandsetBrand create");
    };

    HandsetBrand.prototype.setHandsetSoft = function(soft){
        if(soft instanceof HandsetSoft)
            this.soft = soft;
    };

    HandsetBrand.prototype.run = function(){};

    return HandsetBrand;
})()

var HandsetBrandM = (function(_super){

    __extends(HandsetBrandM, _super);

    function HandsetBrandM(){
        console.log("HandsetBrandM create");
    };

    HandsetBrandM.prototype.run = function(){
        this.soft.runSoft()
    };

    return HandsetBrandM;

})(HandsetBrand)

/*
    client: 客户端类
*/
var client = (function(){

    function client(){
        console.log("client create");
    };

    client.prototype.main = function(){

        var m = new HandsetBrandM();
        var g = new HandGame();
        m.setHandsetSoft(g);
        m.run();

    };

    return client;
})()

cl = new client()
cl.main()