//初始化库类，使用单列模式
_ = new _();
/**
*  _.onDomReady 的测试用例
*
*/

_.onDomReady(function() {
    console.log('Dom is ready');
});

/*-----------------------------------------------------------*/

/**
*  _.Events 的测试用例
*  
*/

_.Events.add(document.body, "click", function(e) {
    console.log("Mouse clicked at 'x' position=" + e.pageX
         + " and 'y' position=" + e.pageY);
});

/*-----------------------------------------------------------*/

/**
*  _.Remote 的测试用例
*  
*/

_.Remote.load({
    url: "hi.php",
    callback: function(response) {
        console.log("message return from hi: " + response.text);
    },
    timeout: 3*1000,
    autoReload: false,
    timeoutCallback: function(){console.log("hey,timeout.call by timeoutCallback.");}
});

_.Remote.save({
    url: "hi.php",
    data: "par=1&par2=2",
    callback: function(response){
        console.log("retrun value=" + response.text);
    },
});

/*-----------------------------------------------------------*/