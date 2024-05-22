class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer>
      <div>
        Copyright &copy; 2024 - Where You Can Eat
      </div>
    </footer>
    `;
  }
}

customElements.define("footer-bar", FooterBar);