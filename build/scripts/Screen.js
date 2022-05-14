define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Screen {
        html;
        name;
        template;
        callBacks;
        treeCreated;
        constructor(name, template) {
            this.html = template;
            this.name = name;
            this.template = document.createElement("div");
            this.template.style.width = "100%";
            this.template.style.display = "flex";
            this.template.style.flexDirection = "column";
            this.template.id = "cradova-screen-set";
            this.callBacks = [];
            this.treeCreated = false;
        }
        async package() {
            if (typeof this.html === "function") {
                let fuc = await this.html();
                if (typeof fuc === "function") {
                    this.template.append(fuc());
                }
                else {
                    this.template.append(fuc);
                }
            }
            else {
                if (this.html instanceof HTMLElement) {
                    this.template.append(this.html);
                }
            }
            if (!(this.template.firstChild instanceof HTMLElement)) {
                throw new Error("Cradova err only parent with descendants is valid ");
            }
            this.treeCreated = true;
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
            const screen = document.querySelector("#cradova-screen-set");
            if (screen) {
                document.querySelector("#app-wrapper").removeChild(screen);
            }
        }
        async Activate() {
            if (document.title === this.name) {
                return;
            }
            if (!this.treeCreated) {
                await this.package();
            }
            document.title = this.name;
            this.detach();
            document.querySelector("#app-wrapper").append(this.template);
            if (document.querySelector("#app-wrapper").childElementCount > 1) {
                //   this.detach();
            }
            //    console.log(document.querySelector("#app-wrapper").childElementCount);
            this.callBacks.forEach((cb) => cb(this.template.firstChild));
        }
    }
    exports.default = Screen;
});
//# sourceMappingURL=Screen.js.map