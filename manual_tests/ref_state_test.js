//? ----> test passed

function uuid() {
  let t = Date.now ? +Date.now() : +new Date();
  return "cradova-id-xxxxx".replace(/[x]/g, function (e) {
    const r = (t + 16 * Math.random()) % 16 | 0;
    return ("x" === e ? r : (7 & r) | 8).toString(16);
  });
}

const Ref = class {
  constructor(component) {
    this.component = component.bind(this);
    this.stateID = uuid();
    this.effects = [];
    this.effectuate = null;
    this.rendered = false;
    this.published = false;
    this.hasFirstStateUpdateRun = false;
    this.preRendered = null;
  }
  render(data2, stash) {
    this.effects = [];
    this.rendered = false;
    this.hasFirstStateUpdateRun = false;
    const chtml = this.component(data2);
    if (stash) {
      this.stash = data2;
    }
    this.effector();
    this.published = true;
    this.rendered = true; // !
  }
  effect(fn) {
    if (!this.rendered) {
      this.effects.push(fn.bind(this));
    }
  }
  async effector() {
    if (!this.rendered) {
      for (let i = 0; i < this.effects.length; i++) {
        await this.effects[i].apply(this);
      }
    }
    if (!this.hasFirstStateUpdateRun && this.effectuate) {
      await this.effectuate();
    }
    this.hasFirstStateUpdateRun = true;
  }
  updateState(data2, stash) {
    // console.log({ data2, rendered: this.rendered, published: this.published });
    if (!this.rendered) {
      async function updateState(data3) {
        await this.Activate(data3);
      }
      this.effectuate = updateState.bind(this, data2);
      return;
    } else {
      if (this.published) {
        (async () => {
          await this.Activate(data2);
        })();
      }
    }
  }
  async Activate(data2) {
    this.published = false;
    this.component(data2);
    this.published = true;
  }
};

const ref = new Ref(function (d) {
  this.effect(() => {
    console.log("effect");
    this.updateState(true);
  });
  this.updateState(false);
  this.updateState(false);
  this.updateState(false);
  if (d) {
    console.log("lol");
  } else {
    console.log(d === false ? "boohoo" : "");
  }
});

ref.render();
// ref.updateState(false);
// ref.updateState(false);
// ref.updateState(false);
// ref.updateState(false);
