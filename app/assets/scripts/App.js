import "../styles/styles.css";
//alert("Hello, this is just a test.!!!");
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnscroll";

new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
let mobileMenu = new MobileMenu();

if (module.hot) {
  module.hot.accept();
}
