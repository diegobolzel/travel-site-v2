import "../styles/styles.css";
import "lazysizes";
//alert("Hello, this is just a test.!!!!!!!");
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnscroll";
import StickyHeader from "./modules/StickyHeader";

new StickyHeader();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
new MobileMenu();
let modal;

document.querySelectorAll(".open-modal").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (typeof modal == "undefined") {
      // x is the file we are importing
      import(/* webpackChunkName: "modal" */ "./modules/Modal")
        .then((x) => {
          modal = new x.default();
          setTimeout(() => modal.openTheModal(), 20);
        })
        .catch(() => console.log("There was a problem."));
    } else {
      modal.openTheModal();
    }
  });
});

if (module.hot) {
  module.hot.accept();
}
