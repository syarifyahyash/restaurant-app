import CONFIG from "../../globals/config";

const createRestaurantItemTemplate = (restaurant) => `
  <article tabindex="0" class="list-item">
    <div>
      <img class="resto-pic lazyload" src="${CONFIG.BASE_URL}/images/medium/${restaurant.pictureId}" crossorigin="anonymous">
    </div>
    <div class="">
      <p class="resto-name"><a href="/#/detail/${restaurant.id}" id="${restaurant.id}" class="resto-detail">${restaurant.name}</a></p>
    </div>
    <div class="">
      <p class="resto-rating">⭐️ ${restaurant.rating} / 5</p>
    </div>
  </article>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <article tabindex="0" class="detail-item">
    <div class="">
      <p class="detail-name">${restaurant.name}</p>
    </div>
    <div >
      <img class="detail-pic" src="${CONFIG.BASE_URL}/images/small/${
  restaurant.pictureId
}" alt="Gambar Restoran" crossorigin="anonymous">
    </div>
    <div class="">
      <p class="detail-menu">Alamat</p>
      <p class="detail-address">📌 ${restaurant.address}</p>
      <p class="detail-menu">Kota</p>
      <p class="detail-city">🏙️ ${restaurant.city}</p>
      <p class="detail-menu">Deskripsi</p>
      <p class="detail-desc">${restaurant.description}</p>
      <p class="detail-menu">Menu Makanan</p>
      <ul class="list-menu">
        ${restaurant.menus.foods
          .map((food) => `<li>🍽️ ${food.name}</li>`)
          .join("")}
      </ul>
      <p class="detail-menu">Menu Minuman</p>
      <ul class="list-menu">
        ${restaurant.menus.drinks
          .map((drink) => `<li>🍨 ${drink.name}</li>`)
          .join("")}
      </ul>
      <p class="detail-reviews">Customer Reviews</p>
      <ul class="list-review">
        ${restaurant.customerReviews
          .map(
            (review) =>
              `<li><p class="review-name">💬 ${review.name}</p>${review.review}</li>`
          )
          .join("")}
      </ul>
      <div id="likeButtonContainer"></div>
    </div>
    
  </article>
`;

const createFavRestaurantButton = () => `
      <button aria-label="favorite this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
      </button>
    `;

const createUnFavRestaurantButton = () => `
      <button aria-label="unfavorite this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
      </button>
    `;

export { createRestaurantItemTemplate, createRestaurantDetailTemplate, createFavRestaurantButton, createUnFavRestaurantButton};
