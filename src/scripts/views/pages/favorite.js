import FavoriteRestaurantIdb from "../../data/fav-restaurants-idb.js";
import { createRestaurantItemTemplate } from "../templates/template-creator.js";

const Favorite = {
  async render() {
    return `
      
    `;
  },
 
  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    document.querySelector(".title-section h2").innerText = "";
    document.querySelector(".title-section h2").innerText = "Restoran Favorit";
  
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restoList = document.getElementById("restoList");
    restoList.innerHTML = "";
    restaurants.forEach((restaurant) => {
      restoList.innerHTML += createRestaurantItemTemplate(restaurant);
    });

  },
};
 
export default Favorite;