import "../styles/styles.css";
//alert("Hello, this is just a test.!!!");
import MobileMenu from "./modules/MobileMenu";

let mobileMenu = new MobileMenu();

if (module.hot) {
  module.hot.accept();
}
