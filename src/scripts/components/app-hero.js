class AppHero extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="hero">
      <div class="hero__inner">
        <h1 class="hero__title">Feast Your Senses with Where You Can Eat!!</h1>
        <p class="hero__tagline">
          Temukan dan Manjakan lidah Anda dengan makanan sehat bergizi di Restoran Terbaik Pilihan Where You Can Eat!
        </p>
      </div>
      <!--
      <picture>
        <source class="hero-img-small" media="(max-width: 600px)" srcset="./images/hero-image_2-small.jpg">
        <img class="hero-img-large" src="./images/hero-image_2-large.jpg" alt="Hero Image">
      </picture>
      -->
    </div>
    `;
  }
}

customElements.define("app-hero", AppHero);
