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

var Component = (function(){

    function Component(name){
        console.log("Component create");
        this.name = name;
    };

    Component.prototype.Add = function(c){};

    Component.prototype.Remove = function(c){};

    Component.prototype.Display = function(d){};

    return Component;
})()

var Composite = (function(_super){

    __extends(Composite, _super);

    function Composite(){
        console.log("Composite create");
        this.child = []
    };

    Composite.prototype.Add = function(c){};

    Composite.prototype.Remove = function(c){};

    Composite.prototype.Display = function(d){};

    return Composite;

})(Component)

var Leaf = (function(_super){

    __extends(Leaf, _super);

    function Leaf(){
        console.log("Leaf create");
    };

    Leaf.prototype.Add = function(c){
        console.log("Cannot add to a leaf");
    };

    Leaf.prototype.Remove = function(c){
        console.log("Cannot remove from a leaf");
    };

    Leaf.prototype.Display = function(d){};

    return Leaf;
})(Component)
