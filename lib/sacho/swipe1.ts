/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * swipe
 * ---
 * Now you can detect swipes the best way possible
 *
 * @param callback
 * @param touching?
 * @param element?
 */
export function swipe(
  callback: (swipe_data: Record<string, number>) => void,
  touching = false,
  element?: HTMLElement
) {
  if (!(typeof callback === "function")) {
    throw new Error(
      " ✘  Cradova err:  no function given for the swipe handler"
    );
  }
  let touchingState = false;
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;

  function handleTouchStart(event: TouchEvent) {
    touchstartX = Math.round(event.changedTouches[0].clientX);
    touchstartY = Math.round(event.changedTouches[0].clientY);
  }

  const capturedGesture: Record<string, number> = {
    top: 0,
    tap: 0,
    down: 0,
    left: 0,
    right: 0,
    touch: 0,
  };

  function handleGesture(event: TouchEvent) {
    touchendX = Math.round(
      event.changedTouches[event.changedTouches.length - 1].clientX
    );
    touchendY = Math.round(
      event.changedTouches[event.changedTouches.length - 1].clientY
    );

    //
    if (touching) {
      capturedGesture.top =
        capturedGesture.down =
        capturedGesture.right =
        capturedGesture.left =
        capturedGesture.tap =
        capturedGesture.touch =
          0;
    }

    if (touching) {
      if (touchingState) {
        handleTouchStart(event);
        touchingState = false;
      } else {
        capturedGesture.top =
          capturedGesture.down =
          capturedGesture.right =
          capturedGesture.left =
          capturedGesture.tap =
          capturedGesture.touch =
            0;
        touchingState = true;
      }
    }

    if (touchendX > touchstartX) {
      capturedGesture.right = touchendX - touchstartX;
    }
    if (touchendX < touchstartX) {
      capturedGesture.left = touchstartX - touchendX;
    }
    if (touchendY > touchstartY) {
      capturedGesture.down = touchendY - touchstartY;
    }
    if (touchendY < touchstartY) {
      capturedGesture.top = touchstartY - touchendY;
    }
    if (touchendY == touchstartY) {
      capturedGesture.tap = touching ? 0 : 1;
      capturedGesture.touch = touching ? 1 : 0;
    }

    const keys = Object.keys(capturedGesture);
    let max = keys[0];
    for (let i = 1; i < keys.length; i++) {
      const value = keys[i];
      if (capturedGesture[value] > capturedGesture[max]) max = value;
    }

    if (callback) {
      callback({ [max]: capturedGesture[max] });
    }
  }

  const escapeTSError = element || document.body;

  return {
    // swipe event
    start() {
      if (touching) {
        escapeTSError?.addEventListener("touchmove", handleGesture);
      } else {
        escapeTSError?.addEventListener("touchstart", handleTouchStart);
        escapeTSError?.addEventListener("touchend", handleGesture);
      }
    },
    stop() {
      if (touching) {
        escapeTSError?.removeEventListener("touchmove", handleGesture);
      } else {
        escapeTSError?.removeEventListener("touchstart", handleTouchStart);
        escapeTSError?.removeEventListener("touchend", handleGesture);
      }
    },
  };
}
