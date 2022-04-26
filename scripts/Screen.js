class Screen {
    constructor(name, template) {
        this.name = name;
        this.template = document.createElement("div");
        this.template.style.width = "100%";
        this.template.style.display = "flex";
        this.template.style.flexDirection = "column";
        this.template.id = "cradova-screen-set";
        if (typeof template === "function") {
            let fuc = template();
            this.template.append(fuc);
            // if (typeof fuc === "function") {
            //   this.template.append(fuc());
            // } else {
            //   this.template.append(fuc);
            // }
        }
        else {
            if (!(template instanceof HTMLElement)) {
                throw new Error("Cradova err only should a html element is valid");
            }
            else {
                this.template.append(template);
            }
        }
        this.callBacks = [];
    }
    onActivate(cb) {
        this.callBacks.push(cb);
    }
    addChild(...addOns) {
        for (let i = 0; i < addOns.length; i++) {
            if (addOns[i] && addOns[i] instanceof HTMLElement) {
                this.template.append(addOns[i]);
            }
            if (typeof addOns[i] === "function") {
                this.template.append(addOns[i]());
            }
        }
    }
    detach() {
        var _a;
        const screen = document.querySelector("#cradova-screen-set");
        if (screen) {
            (_a = document.querySelector("#app-wrapper")) === null || _a === void 0 ? void 0 : _a.removeChild(screen);
        }
    }
    Activate() {
        var _a;
        if (document.title === this.name) {
            return;
        }
        const screen = document.querySelector("#cradova-screen-set");
        if (screen) {
            this.detach();
        }
        document.title = this.name;
        (_a = document.querySelector("#app-wrapper")) === null || _a === void 0 ? void 0 : _a.append(this.template);
        this.callBacks.forEach((cb) => cb(this.template.firstChild));
    }
}
export default Screen;
