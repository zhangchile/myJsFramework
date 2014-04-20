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