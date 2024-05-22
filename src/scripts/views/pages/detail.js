import UrlParser from "../../routes/url-parser.js";
import RestaurantSource from "../../data/restaurant-source.js";
import { createRestaurantDetailTemplate } from "../templates/template-creator.js";
import LikeButtonPresenter from "../../utils/like-button-presenter.js";

const Detail = {
  async render() {
    return `
      
    `;
  },

  async afterRender() {
    document.querySelector(".title-section h2").innerText = "";
    document.querySelector(".title-section h2").innerText = "Detail Restoran";

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.Detail(url.id);

    const restoList = document.getElementById("restoList");
    restoList.innerHTML = "";
    restoList.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        rating: restaurant.restaurant.rating,
        pictureId: restaurant.restaurant.pictureId,
      },
    });
  },
};

export default Detail;
