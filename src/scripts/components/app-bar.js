class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav id="drawer" class="nav">
      <ul class="nav__list">
        <li class="nav__item"><span class="nav__brand">Where You Can Eat</span></li>
        <li class="nav__item"><a href="#/home">Home</a></li>
        <li class="nav__item"><a href="#/favorite">Favorite</a></li>
        <li class="nav__item"><a href="https://github.com/syarifyahyash" target="_blank" rel="noopener">About Us</a></li>
      </ul>
    </nav>
    `;
  }
}

customElements.define("app-bar", AppBar);