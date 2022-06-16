define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function swipe(item) {
        var caller;
        var startX = 0, startY = 0;
        if (typeof item === "object") {
            caller = item;
        }
        else {
            throw new Error("no call given for the swipe handler");
        }
        function handleTouchStart(e) {
            startX = e.changedTouches[0].screenX;
            startY = e.changedTouches[0].screenY;
        }
        function handleTouchEnd(e) {
            var diffX = e.changedTouches[0].screenX - startX;
            var diffY = e.changedTouches[0].screenY - startY;
            var ratioX = Math.abs(diffX / diffY);
            var ratioY = Math.abs(diffY / diffX);
            var absDiff = Math.abs(ratioX > ratioY ? diffX : diffY);
            if (absDiff < 10) {
                if (caller.touch) {
                    callback.touch(caller.touch);
                }
            }
            if (ratioX > ratioY) {
                // left and right
                if (diffX >= 0) {
                    if (caller.right) {
                        callback.right(caller.right);
                    }
                }
                else {
                    if (caller.left) {
                        callback.left(caller.left);
                    }
                }
                // up and down
            }
            else {
                if (diffY >= 0) {
                    if (caller.down) {
                        callback.down(caller.down);
                    }
                }
                else {
                    if (caller.up) {
                        callback.up(caller.up);
                    }
                }
            }
        }
        document.body.addEventListener("touchstart", handleTouchStart);
        document.body.addEventListener("touchend", handleTouchEnd);
        var callback = {
            touch: function (callback) {
                return callback();
            },
            right: function (callback) {
                return callback();
            },
            left: function (callback) {
                return callback();
            },
            down: function (callback) {
                return callback();
            },
            up: function (callback) {
                return callback();
            }
        };
    }
    exports["default"] = swipe;
});
/*
 *** HOW TO USE ***

    function touch(){
     console.log("touching")
    }
    
    

    function up(){
     console.log("swipe up")
    }
    

    function down(){
     console.log("swipe down")
    }
    

    function right(){
     console.log("swipe right")
    }


    function left(){
     console.log("swipe left")
    }



    let obj = {down: down,
               touch: touch,
               up: up,
               right: right,
               left: left
           }

    swipe(obj)



 */
//# sourceMappingURL=swipe.js.map