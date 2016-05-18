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

/*
    Vehicle:机动车类
*/
var Vehicle = (function(){

    function Vehicle(){
        console.log("Vehicle create");
    };

    Vehicle.prototype.type = function(){};

    Vehicle.prototype.cost = function(){};

    return Vehicle;
})()

var motor = (function(_super){

    __extends(motor, _super);

    function motor(){
        console.log("motor create");
    };

    motor.prototype.type = function(){
        console.log("Type is motor");
    };

    motor.prototype.cost = function(){
        console.log("motor cost 10000$");
    };

    return motor;
})(Vehicle)

var car = (function(_super){

    __extends(car, _super);

    function car(){
        console.log("car create");
    };

    car.prototype.type = function(){
        console.log("Type is car");
    };

    car.prototype.cost = function(){
        console.log("car cost 99999$");
    };

    return car;

})(Vehicle)

var NonVehicle = (function(){

    function NonVehicle(){
        console.log("NonVehicle create");
    };

    NonVehicle.prototype.type = function(){};

    NonVehicle.prototype.cost = function(){};

    return NonVehicle;
})()

var bike = (function(_super){

    __extends(bike, NonVehicle);

    function bike(){
        console.log("bike create");
    };

    bike.prototype.type = function(){
        console.log("Type is bike");
    };

    bike.prototype.cost = function(){
        console.log("bike cost 100$");
    };

    return bike;

})(NonVehicle)

var foot = (function(_super){

    __extends(foot, _super);

    function foot(){
        console.log("foot create");
    };

    foot.prototype.type = function(){
        console.log("Type is foot");
    };

    foot.prototype.cost = function(){
        console.log("foot cost 0$");
    };

    return foot;

})(NonVehicle)

var AbstractFactory = (function(){

    function AbstractFactory(){
        console.log("AbstractFactory create");
    };

    AbstractFactory.prototype.createProductA = function(){};

    AbstractFactory.prototype.createProductB = function(){};

    return AbstractFactory;

})()

var factory1 = (function(_super){

    __extends(factory1, _super);

    function factory1(){
        console.log("factory1 create");
    }

    factory1.prototype.createProductA = function(){
        return new motor();
    }

    factory1.prototype.createProductB = function(){
        return new bike();
    }

    return factory1;

})(AbstractFactory)

var factory2 = (function(_super){

    __extends(factory2, _super);

    function factory2(){
        console.log("factory2 create");
    }

    factory2.prototype.createProductA = function(){
        return new car();
    }

    factory2.prototype.createProductB = function(){
        return new foot();
    }

    return factory2;

})(AbstractFactory)


/*
    client: 客户端类
*/
var client = (function(){

    function client(){
        console.log("client create");
    };

    client.prototype.main = function(){

        factory = new factory1();
        motor = factory.createProductA();
        motor.type();
        motor.cost();

    };

    return client;
})()

cl = new client()
cl.main()