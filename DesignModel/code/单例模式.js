var Singleton = (function(){

    var instantiated;

    function init(){
        return {
            method: function(){
                console.log("Singleton");
            },
            property: "Singleton"
        };
    }

    function getInstance(){
        if(!instantiated) instantiated = init();
        return instantiated;
    }

    return {
        getInstance:getInstance
    }
})()

Singleton.getInstance().method();