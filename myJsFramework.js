/**
 * javascript 实用类库
 *
 * @author chilezhang
 * @link https://www.github.com/zhangchile/
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

/**
*  ajax load method name Remote
*  
*  include _.Remote.load() (use GET) and _.Remote.save (use POST)
*
*/

_.prototype.Remote = {
    //getConnector method return a connection object
    getConnector: function() {
        var connectionObj = null;
        if(window.XMLHttpRequest) {//w3c supported
            connectionObj = new XMLHttpRequest();
        } else if(window.ActiveXObject) {//IE
            connectionObj = new ActiveXObject("Microsoft.XMLHttp");
        }
        return connectionObj;
    },

    //setting the the callback function while it get a response  
    configureConnector: function(connector, callback, tid) {
        connector.onreadystatechange = function() {
            if(connector.readyState == 4) {
                if(connector.status == 200) {
                    if(tid) {
                        clearTimeout(tid); 
                    }
                    callback.call(connector, {
                        text: connector.responseText,
                        xml: connector.responseXML
                    });
                }
            }
        }
    },

    //abort a connection while timeout and retry it
    abortLoad: function(connector, request, autoReload, callback) {
        connector.abort();
        if(autoReload) {
            this.load(request);
        } else {
            callback();
        }
    },

    /**
    * the function need a object literal containing a URL to load,
    * use method get ,such an example:
    * _.Remote.load({
    *                 url: 'www.google.com',
    *                 timeout:'60',
    *                 autoReload: true,
    *                 callback: function(response){alert(response.text);}
    *                 timeoutCallback: function(){alert('timeout')}
    * //if autoReload is true, this timeoutCallback function will not usefull
    *              });
    */
    load: function(request) {
        var url = request.url || "";
        var callback = request.callback || function(){};
        var timeoutCallback = request.timeoutCallback || function(){};        
        var timeout = request.timeout || -1;
        var autoReload = request.autoReload || false;

        var connector = this.getConnector();
        if(connector) {
            var tid;
            if(timeout > 0) {
                var that = this;
                tid = setTimeout(function(){
                    that.abortLoad.call(that, connector, request, 
                        autoReload, timeoutCallback);
                }, timeout);
            }
            this.configureConnector(connector, callback, tid);
            connector.open("GET", url, true);
            connector.send("");
        }
    },

    /**
    * the function need a object literal containing a URL to load,
    * use method post ,such an example:
    * _.Remote.save({
    *                 url: 'www.google.com',
    *                 data: 'data1=1&dat2=2'
    *                 callback: function(response){alert(response.text);}
    *              });
    */
    save: function(request) {
        var url = request.url || "";
        var callback = request.callback || function(){};
        //param=value1&&param2=value2....
        var data = request.data || "";

        var connector = this.getConnector();
        if(connector) {
            this.configureConnector(connector, callback);
            connector.open("POST", url, true);
            connector.setRequestHeader("Content-type",
                "application/x-www-form-urlencoded");
            //XMLHttpRequest isn't allowed to set these headers, 
            //they are being set automatically by the browser.
            //connector.setRequestHeader("Connection", "close");
            connector.send(data);
        }
    }
};