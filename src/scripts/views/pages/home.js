import RestaurantSource from "../../data/restaurant-source.js";
import { createRestaurantItemTemplate } from "../templates/template-creator.js";

const Home = {
  async render() {
    return `
      
    `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    document.querySelector(".title-section h2").innerText = "";
    document.querySelector(".title-section h2").innerText = "Daftar Restoran";

    const restaurants = await RestaurantSource.Home();
    const restoList = document.getElementById("restoList");
    restoList.innerHTML = "";
    restaurants.forEach((restaurant) => {
      restoList.innerHTML += createRestaurantItemTemplate(restaurant);
    });

  },
};

export default Home;
