import FavoriteRestaurantIdb from '../data/fav-restaurants-idb.js';
import { createFavRestaurantButton, createUnFavRestaurantButton } from '../views/templates/template-creator.js';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
 
    await this._renderButton();
  },
 
  async _renderButton() {
    const { id } = this._restaurant;
 
    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },
 
  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },
 
  _renderLike() {
    this._likeButtonContainer.innerHTML = createFavRestaurantButton();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
    await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
    this._renderButton();
  });
  },
 
  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnFavRestaurantButton();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
    this._renderButton();
  });
  },
};
 
export default LikeButtonPresenter;