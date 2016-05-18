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

