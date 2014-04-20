/**
 * javascript 实用类库
 *
 * @author chilezhang
 * @link github.com/zhangchile
 * @version 1.0
*/
var _ = function() {};

/**
* DOM ready
*
* @param function
*
*/
_.prototype.onDomReady = function(callback) {
    if(document.addEventListener) {
        document.addEventListener("DOMContentLoaded", callback, false);
    } else {
        if(document.body && document.body.lastChild) {//when the last node of document is load
            callback();
        } else {
            return setTimeout(arguments.callee, 0);
        }
    }
}
/**
* standard handle events
*
*
*/

_.prototype.Events = {
    //this add method allows us to assign a function to an element.
    add: function(element, eventType, callback) {
        var self = this;
        eventType = eventType.toLowerCase();
        if(element.addEventListener) {//W3C event listener method
            element.addEventListener(eventType, function(e) {
                callback(self.standardize(e));
            }, false);
        } else if(element.attachEvent) {//IE
            element.attachEvent("on" + eventType, function(){
                //IE use window.event to store the current event's properties
                callback(self.standardize(window.event));
            });
        }
    },
    //this  remove method allow us to remove a function from a element.
    remove: function(element, eventType, callback) {
        eventType = eventType.toLowerCase();
        if(element.removeEventListener) {//W3C method
            element.removeEventListener(element, eventType, callback);
        } else if (element.detachEvent) {//IE
            element.detachEvent("on" + eventType, callback);
        }
    },
    //this standardize method produces a unified set of event 
    //properties, regardless of the browser
    //
    standardize: function(event) {
        var page = this.getMousePositionRelativeToDocument(event);
        var offset = this.getMousePositionOffset(event);
        if(event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
        return {
            target: this.getTarget(event),
            relatedTarget: this.getRelatedTarget(event),
            key: this.getCharacterFromKey(event),
            pageX: page.x,
            pageY: page.y,
            offsetX: offset.x,
            offsetY: offset.y,
            preventDefault: function() {
                if(event.preventDefault) {
                    event.preventDefault();//W3C method
                } else {
                    event.returnValue = false;//IE
                }
            }
        };
    },
    // return the element the event occurred on
    getTarget: function(event) {
        var target = event.srcElement || event.target;
        if(target.nodeType == 3) {//3 == text node
            target.target.parentNode;
        }
        return target;
    },
    getCharacterFromKey: function(event) {
        var character = "";
        if(event.keyCode) {//IE
            character = String.fromCharCode(event.keyCode);
        } else if (event.which) {//W3C
            character = String.fromCharCode(event.which);
        }
        return character;
    },
    getMousePositionRelativeToDocument: function(event) {
        var x = 0, y = 0;
        if(event.pageX) {
            x = event.pageX;
            y = event.pageY;
        } else if (event.clientX) {
            x = event.clientX + document.body.scrollLeft + 
                document.documentElement.scrollLeft;
            y = event.clentY + document.body.scrollTop + 
                document.documentElement.scrollTop;
        }
        return {
            x: x,
            y: y
        }
    },
    getMousePositionOffset: function(event) {
        var x = 0, y = 0;
        if(event.layerX) {
            x = event.layerX;
            y = event.layerY;
        } else if (event.offsetX) {
            x = event.offsetX;
            y = event.offsetY;
        }
        return {
            x: x,
            y: y
        }        
    },
    getRelatedTarget: function(event) {
        var relatedTarget = event.relatedTarget;
        if(event.type == "mouseover") {
            relatedTarget = event.fromElement;
        } else if (event.type == "mouseout") {
            relatedTarget = event.toElement;
        }
        return relatedTarget;
    }
};
