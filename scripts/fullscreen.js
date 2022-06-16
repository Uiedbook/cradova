// for making the dom elements fulscreen
export default function fullScreen(e) {
  return {
    set() {
      e.requestFullscreen().catch((err) => {
        throw err;
      });
    },
    exist() {
      document.exitFullscreen();
    },
    // toggle: () => {
    //   if (!document.fullscreenElement) {
    //     e.requestFullscreen().catch((err) => {
    //       throw err;
    //     });
    //   } else {
    //     document.exitFullscreen();
    //   }
    // },
  };
}

/*
 *** HOW TO USE ***

u("#container").fullscreen().toggle()
u("#container").fullscreen().exist()
u("#container").fullscreen().set()
*/
