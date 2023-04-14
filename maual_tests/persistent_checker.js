export class Screen {
  _html;
  _name;
  _packed = false;
  _persist = true;
  constructor(cradova_screen_initials) {
    const { template, name, persist } = cradova_screen_initials;
    this._html = template;
    this._name = name;
    if (typeof persist !== "undefined") {
      this._persist = persist;
    }
  }
  async _package() {
    this._html.apply(this, this._data);
  }
  async _Activate(force) {
    // console.log(this._packed);
    if (!this._persist || force) {
      await this._package();
      this._packed = true;
    } else {
      if (!this._packed) {
        this._packed = true;
        console.log("boohoo", this._packed);
        await this._package();
      }
    }
  }
}

const sc = new Screen({
  name: "hello",
  template: () => {
    console.log("compiled");
    return "compiled";
  },
});

sc._Activate();
sc._Activate();
