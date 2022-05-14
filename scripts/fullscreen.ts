// for making the dom elements fulscreen
export default function fullScreen(e: Element) {
  return {
    set() {
      e.requestFullscreen().catch((err: any) => {
        throw err;
      });
    },
    exist() {
      document.exitFullscreen();
    },
  };
}

/*
 *** HOW TO USE ***

u("#container").fullscreen().toggle()
u("#container").fullscreen().exist()
u("#container").fullscreen().set()
*/
