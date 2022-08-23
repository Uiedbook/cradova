var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
   *
   * @param name
   * @param template
   * @param transitions
   */
export class Screen {
    constructor(cradova_screen_initials) {
        this.secondaryChildren = [];
        /**
         * this tells cradova to persist state on the screen or not
         * persiting is better
         */
        this.persist = true;
        const { template, name, callBack, transition, persist } = cradova_screen_initials;
        if (typeof template !== "function") {
            throw new Error("Cradova err: only functions that returns a cradova element is valid as screen");
        }
        this.html = template;
        this.name = name;
        this.template = document.createElement("div");
        this.template.style.width = "100%";
        this.template.style.display = "flex";
        this.template.style.flexDirection = "column";
        this.template.id = "cradova-screen-set";
        this.callBack = callBack;
        this.transition = transition;
        if (!persist) {
            this.persist = false;
        }
    }
    package(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.template.innerHTML = '';
            if (typeof this.html === "function") {
                let fuc = yield this.html(data);
                if (typeof fuc === "function") {
                    fuc = fuc();
                    if (!(fuc instanceof HTMLElement)) {
                        throw new Error("Cradova err only parent with descendants is valid");
                    }
                    else {
                        this.template.append(fuc);
                    }
                }
            }
            this.template.append(...this.secondaryChildren);
        });
    }
    onActivate(cb) {
        this.callBack = cb;
    }
    addChild(...addOns) {
        for (let i = 0; i < addOns.length; i++) {
            if (addOns[i] && addOns[i] instanceof HTMLElement) {
                this.secondaryChildren.push(addOns[i]);
            }
            if (addOns[i] && typeof addOns[i] === "function") {
                this.secondaryChildren.push(addOns[i]());
            }
        }
    }
    detach() {
        var _a;
        // crearing the dom 
        const screens = document.querySelectorAll("#cradova-screen-set");
        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            if (this.transition) {
                screen.classList.remove("CRADOVA-UI-" + this.transition);
            }
            (_a = screen.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(screen);
        }
    }
    Activate(data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let packed = false;
            if (document.title === this.name) {
                return;
            }
            if (!this.template.firstChild) {
                packed = true;
                yield this.package(data);
            }
            if (!this.persist && !packed) {
                yield this.package(data);
            }
            document.title = this.name;
            this.detach();
            document.querySelector("#app-wrapper").append(this.template);
            if (this.transition) {
                (_a = this.template) === null || _a === void 0 ? void 0 : _a.classList.add("CRADOVA-UI-" + this.transition);
                // console.log(this.template.className);
            }
            if (this.callBack) {
                this.callBack(this.template.firstChild, data);
            }
            window.scrollTo(0, 0);
        });
    }
}
// SCREEN ANIMATION CLASSES
Screen.SCALE_IN = "SCALE-IN";
Screen.SCALE_OUT = "SCALE-OUT";
Screen.CIRCLE_IN = "CIRCLE-IN";
Screen.CIRCLE_OUT = "CIRCLE-OUT";
Screen.FADE_OUT = "FADE-OUT";
Screen.FADE_IN = "FADE-IN";
Screen.SLIDE_UP = "SLIDE-UP";
Screen.SLIDE_DOWN = "SLIDE-DOWN";
Screen.SLIDE_LEFT = "SLIDE-LEFT";
Screen.SLIDE_RIGHT = "SLIDE-RIGHT";
