import 'regenerator-runtime';
import '../styles/main.css';
import FavoriteRestaurantIdb from './data/fav-restaurants-idb';
import CONFIG from './globals/config.js';
import swRegister from './utils/sw-register.js';
import './components/app-bar.js';
import './components/app-hero.js';
import './components/footer-bar.js';

const restoList = document.querySelector('#restoList');
const baseUrl = CONFIG.BASE_URL;

const renderRestoItem = (restaurant) => `
  <article tabindex="0" class="list-item">
    <div>
      <img class="resto-pic" src="${baseUrl}/images/medium/${restaurant.pictureId}" alt="Gambar Restoran">
    </div>
    <div class="">
      <p class="resto-name"><a href="#" id="${restaurant.id}" class="resto-detail">${restaurant.name}</a></p>
    </div>
    <div class="">
      <p class="resto-rating">⭐️ ${restaurant.rating} / 5</p>
    </div>
  </article>
`;

const getAllRestaurant = async () => {
  try {
    const response = await fetch(`${baseUrl}/list`);
    const responseJson = await response.json();

    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      document.querySelector(".title-section h2").innerText = "Daftar Restoran";
      restoList.innerHTML = "";

      responseJson.restaurants.forEach(restaurant => {
        restoList.innerHTML += renderRestoItem(restaurant);
      });

      // Tambahkan event listener pada setiap link
      const buttons = document.querySelectorAll(".resto-detail");
      buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault(); // Menghindari default behavior dari link
          const restoId = event.target.id;
          getDetailRestaurant(restoId);
        });
      });
    }
  } catch (error) {
    showResponseMessage(error);
    console.log(error);
  }
};

const getAllFavRestaurant = async () => {
  try {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    if (restaurants.length === 0) {
      restoList.innerHTML = '<p class="no-fav">Tidak ada restoran favorit</p>';
    } else {
      document.querySelector(".title-section h2").innerText = "Restoran Favorit";
      restoList.innerHTML = "";
      restaurants.forEach(restaurant => {
        restoList.innerHTML += renderRestoItem(restaurant);
      });

      // Tambahkan event listener pada setiap link
      const buttons = document.querySelectorAll(".resto-detail");
      buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault(); // Menghindari default behavior dari link
          const restoId = event.target.id;
          getDetailRestaurant(restoId);
        });
      });
    }
  } catch (error) {
    showResponseMessage(error);
    console.log(error);
  }
};

const hamburgerButtonElement = document.querySelector('#hamburger');
const drawerElement = document.querySelector('#drawer');
const bodyElement = document.querySelector('body');

hamburgerButtonElement.addEventListener('click', event => {
  drawerElement.classList.toggle('open');
  event.stopPropagation();
});

bodyElement.addEventListener('click', event => {
  drawerElement.classList.remove('open');
  event.stopPropagation();
});

const showResponseMessage = (message = "Check your internet connection") => {
  // alert(message);
  console.log(message);
};

const renderRestoDetail = (restaurant) => `
  <article tabindex="0" class="detail-item">
    <div class="">
      <p class="detail-name">${restaurant.name}</p>
    </div>
    <div >
      <img class="detail-pic" src="${baseUrl}/images/small/${restaurant.pictureId}" alt="Gambar Restoran">
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
        ${restaurant.menus.foods.map(food => `<li>🍽️ ${food.name}</li>`).join("")}
      </ul>
      <p class="detail-menu">Menu Minuman</p>
      <ul class="list-menu">
        ${restaurant.menus.drinks.map(drink => `<li>🍨 ${drink.name}</li>`).join("")}
      </ul>
      <p class="detail-reviews">Customer Reviews</p>
      <ul class="list-review">
        ${restaurant.customerReviews.map(review => `<li><p class="review-name">💬 ${review.name}</p>${review.review}</li>`).join("")}
      </ul>

      <div id="likeButtonContainer"></div>
    </div>
    
  </article>
`;

// Tambahkan event listener pada link "Home"
document.querySelector(".nav__item a[href='/']").addEventListener("click", (event) => {
  event.preventDefault(); // Menghindari default behavior dari link
  getAllRestaurant();
});

// Tambahkan event listener pada link "Favorit"
document.querySelector(".nav__item a[href='/favorites']").addEventListener("click", (event) => {
  event.preventDefault(); // Menghindari default behavior dari link
  getAllFavRestaurant();
});

const createLikeButton = () => `
  <button aria-label="favorite this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButton = () => `
  <button aria-label="unfavorite this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const likeChecker = async (id) => {
  const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
  return !!restaurant;
}

const getDetailRestaurant = async (restoId) => {
  try {
    const response = await fetch(`${baseUrl}/detail/${restoId}`);
    const responseJson = await response.json();

    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      document.querySelector(".title-section h2").innerText = "Detail Restoran";
      // Bersihkan restoList sebelum menambahkan detail restoran
      restoList.innerHTML = "";
      // Render restodetail
      restoList.innerHTML = renderRestoDetail(responseJson.restaurant);
      // Tambahkan like button
      const likeButtonContainer = document.querySelector("#likeButtonContainer");
      likeButtonContainer.innerHTML = await likeChecker(responseJson.restaurant.id) ? createLikedButton() : createLikeButton();
      const likeButton = document.querySelector("#likeButton");
      likeButton.addEventListener("click", async () => {
        if (await likeChecker(responseJson.restaurant.id)) {
          await FavoriteRestaurantIdb.deleteRestaurant(responseJson.restaurant.id);
          likeButton.innerHTML = createLikeButton();
        } else {
          await FavoriteRestaurantIdb.putRestaurant({
            id: responseJson.restaurant.id,
            name: responseJson.restaurant.name,
            rating: responseJson.restaurant.rating,
            pictureId: responseJson.restaurant.pictureId
          });
          likeButton.innerHTML = createLikedButton();

        }
      });
    }
  } catch (error) {
    showResponseMessage(error);
    console.log(error);
  }
}

  swRegister();
  // getAllRestaurant();