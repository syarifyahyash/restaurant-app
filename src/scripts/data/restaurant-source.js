import API_ENDPOINT from '../globals/api-endpoint.js';
import FavoriteRestaurantIdb from './fav-restaurants-idb.js';
 
class RestaurantSource {
  static async Home() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }
 
  static async Favorite() {
    const response = await FavoriteRestaurantIdb.getAllRestaurant();
    const responseJson = await response.json();
    return responseJson.restaurants;
  }
 
  static async Detail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }
}
 
export default RestaurantSource;