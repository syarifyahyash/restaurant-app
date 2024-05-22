import UrlParser from '../routes/url-parser.js';
import routes from '../routes/routes.js';
import DrawerInitiator from '../utils/drawer-initiator.js';
 
class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
 
    this._initialAppShell();
  }
 
  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
 
    // kita bisa menginisiasikan komponen lain bila ada
  }
 
  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    try {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } catch (error) {
      console.log(error);
      this._content.innerHTML = "<p>Ups.. halaman tidak ditemukan.</p>";
    }

    const skipLink = document.querySelector(".skip-link");
    const mainContent = document.querySelector("#maincontent");

    skipLink.addEventListener("click", event => {
        event.preventDefault();
        mainContent.focus();
    })
  }
}
 
export default App;