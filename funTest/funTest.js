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

/**
*  _.Utils 的测试用例
*
*
*
*/

var Animal = {
    high: 1,
    weight: 2,
    legs: 2
};
var cat = {
    legs: 4,
    tail: true
}
cat = _.Utils.mergeObjects(Animal, cat);
//output
// {
//     cat.high = 1
//     cat.weight = 2
//     cat.legs = 4
//     cat.tail = true 
// }
for(var key in cat) {
    if(cat.hasOwnProperty(key)) {
        console.log("cat." + key + "=" + cat[key]);
    }
}

//output "Hi,i am Mike."
console.log(_.Utils.replaceText("Hi,i am {name}.", {name: "Mike"}));

//output "marginLeft"
console.log(_.Utils.toCamelCase("margin-left"));

//output "font-Family"
console.log(_.Utils.toHyphens("fontFamily"));

/*-----------------------------------------------------------*/