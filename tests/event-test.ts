/**
 * Cradova event
 */
class cradovaEvent {
  private afterMount: Function[] = [];
  private beforeMountActive: Function[] = [];
  async addAfterMount(callback: () => void) {
    if (!this.addAfterMount) {
      this.afterMount = [];
    }
    this.afterMount.push(callback);
  }
  async addBeforeMountActive(callback: () => void) {
    if (!this.beforeMountActive) {
      this.beforeMountActive = [];
    }
    this.beforeMountActive.push(callback);
  }
  dispatchEvent(eventName: "beforeMountActive" | "afterMount") {
    const eventListeners = this[eventName] || [];
    for (let i = 0; i < eventListeners.length; i++) {
      if (eventName.includes("Active")) {
        eventListeners[i]();
      } else {
        eventListeners.shift()!();
      }
    }
  }
}

export const CradovaEvent = new cradovaEvent();
CradovaEvent.addBeforeMountActive(() => {
  console.log("called active");
});
CradovaEvent.addAfterMount(() => {
  console.log("called after");
});
CradovaEvent.dispatchEvent("afterMount");
CradovaEvent.dispatchEvent("afterMount");
CradovaEvent.dispatchEvent("beforeMountActive");
CradovaEvent.dispatchEvent("beforeMountActive");
