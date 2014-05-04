//初始化库类，使用单列模式
_ = new _();
/**
*  _.onDomReady 的测试用例
*
*/
console.group("_.onDomReady 的测试");

(function() {
    _.onDomReady(function() {
        console.log('Dom is ready');
    });
})();

console.groupEnd();
/*-----------------------------------------------------------*/

/**
*  _.Events 的测试用例
*  
*/
console.group("_.Events 的测试");

(function() {
    _.Events.add(document.body, "click", function(e) {
        console.log("Mouse clicked at 'x' position=" + e.pageX
             + " and 'y' position=" + e.pageY);
    });
})();

console.groupEnd();
/*-----------------------------------------------------------*/

/**
*  _.Remote 的测试用例
*  
*/
console.group("_.Remote 的测试");

// (function() {
//     _.Remote.load({
//         url: "hi.php",
//         callback: function(response) {
//             console.log("message return from hi: " + response.text);
//         },
//         timeout: 3*1000,
//         autoReload: false,
//         timeoutCallback: function(){console.log("hey,timeout.call by timeoutCallback.");}
//     });

//     _.Remote.save({
//         url: "hi.php",
//         data: "par=1&par2=2",
//         callback: function(response){
//             console.log("retrun value=" + response.text);
//         },
//     });
// })();

console.groupEnd();
/*-----------------------------------------------------------*/

/**
*  _.Utils 的测试用例
*
*
*
*/
console.group("_.Utils 的测试");

(function() {
    var Animal = {
        high: 1,
        weight: 2,
        legs: 2
    };
    var cat = {
        legs: 4,
        tail: true
    };
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
})();

console.groupEnd();
/*-----------------------------------------------------------*/

/**
*  _.CSS 的测试用例
*
*
*
*/
console.group("_.CSS 的测试");

(function() {
    var header = document.getElementById("header");

    //output header.height = 50px;
    console.log("header.height = " + _.CSS.getAppliedStyle(header, "height"));

    //output header's all className
    console.log("header.getArrayOfClassNames = " + _.CSS.getArrayOfClassNames(header));

    //add another class header
    console.log("add another class to header");
    _.CSS.addClass(header, "another");

    //removeClass header_red frome header
    console.log("remove header_red class from header ");
    _.CSS.removeClass(header, "header_red");

    //hasClass header_red
    console.log("header has the class 'header_red' ?: " + _.CSS.hasClass(header, "header_red"));

    //caculate the header position 
    var pos = _.CSS.getPosition(document.getElementById("container"));
    console.log("container position of the top-left: ");
    console.table({0:pos});
})();

console.groupEnd();
