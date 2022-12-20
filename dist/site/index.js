import { Router } from "../index.js";
/**
 * import screens
 */
import home from "./doc/home.js";
import info from "./doc/info.js";
/**
 * Router setup.
 */
Router.route("/", home);
Router.route("/info", info);
const j = (stuff) => JSON.parse(String(stuff));
document.onload = () => {
    const animatedDivs = document.querySelectorAll(".hidden");
    const observer = new IntersectionObserver((divs) => {
        divs.forEach((div) => {
            if (div.isIntersecting) {
                div.target.classList.add("show");
                if (j(div.target.getAttribute("data-even"))) {
                    div.target.classList.add("right");
                }
                else {
                    div.target.classList.add("left");
                }
            }
            else {
                div.target.classList.remove("show");
                if (j(div.target.getAttribute("data-even"))) {
                    div.target.classList.remove("right");
                }
                else {
                    div.target.classList.remove("left");
                }
            }
        });
    });
    animatedDivs.forEach((adiv, index) => {
        adiv.setAttribute("data-even", index % 2 === 0 ? "1" : "0");
        observer.observe(adiv);
    });
};
