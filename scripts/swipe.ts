export default function swipe(item: any) {
  let caller: { touch: any; right: any; left: any; down: any; up: any };
  let startX = 0,
    startY = 0;
  if (typeof item === "object") {
    caller = item;
  } else {
    throw new Error("no call given for the swipe handler");
  }

  function handleTouchStart(e: {
    changedTouches: { screenY: number; screenX: number }[];
  }) {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  }

  function handleTouchEnd(e: {
    changedTouches: { screenY: number; screenX: number }[];
  }) {
    const diffX = e.changedTouches[0].screenX - startX;
    const diffY = e.changedTouches[0].screenY - startY;
    const ratioX = Math.abs(diffX / diffY);
    const ratioY = Math.abs(diffY / diffX);
    const absDiff = Math.abs(ratioX > ratioY ? diffX : diffY);

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
      } else {
        if (caller.left) {
          callback.left(caller.left);
        }
      }

      // up and down
    } else {
      if (diffY >= 0) {
        if (caller.down) {
          callback.down(caller.down);
        }
      } else {
        if (caller.up) {
          callback.up(caller.up);
        }
      }
    }
  }

  document.body.addEventListener("touchstart", handleTouchStart);
  document.body.addEventListener("touchend", handleTouchEnd);

  const callback = {
    touch(callback: () => any) {
      return callback();
    },
    right(callback: () => any) {
      return callback();
    },

    left(callback: () => any) {
      return callback();
    },

    down(callback: () => any) {
      return callback();
    },

    up(callback: () => any) {
      return callback();
    },
  };
}

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
