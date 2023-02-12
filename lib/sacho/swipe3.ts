export function swipe(id: string, cb: (dir: string, value: number) => void) {
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;
  const gestureZone = document.getElementById(id);
  if (!gestureZone) {
    throw new Error(
      " ✘  Cradova err: element to receive swipe event not found  " + id
    );
  }
  gestureZone?.addEventListener(
    "touchstart",
    function (event: any) {
      touchstartX = event.screenX;
      touchstartY = event.screenY;
    },
    false
  );

  gestureZone?.addEventListener(
    "touchend",
    function (event: any) {
      touchendX = event.screenX;
      touchendY = event.screenY;
      handleGesture();
    },
    false
  );

  function handleGesture() {
    const swiped = "swiped: ";
    if (touchendX < touchstartX) {
      alert(swiped + "left!");
      cb("left", touchstartX - touchendX);
    }
    if (touchendX > touchstartX) {
      alert(swiped + "right!");
    }
    if (touchendY < touchstartY) {
      alert(swiped + "down!");
    }
    if (touchendY > touchstartY) {
      alert(swiped + "left!");
    }
    if (touchendY == touchstartY) {
      alert("tap!");
    }
  }
}
