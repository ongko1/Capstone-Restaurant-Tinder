import axios from 'axios';
import { baseUrl } from '../Shared/baseUrl';

export default {

  getRestaurantsNoRadius(zipCode, category) {
    return axios.get(baseUrl + `/businesses`, {
      headers : {
        'zipCode': zipCode,
        'category': category,
        'radius': ''
      }
    })
  },
  getRestaurantsWithRadius(zipCode, category, radius) {
    return axios.get(baseUrl + `/businesses`, {
      headers : {
        'zipCode': zipCode,
        'category': category,
        'radius': radius
      }
    })
  },
  getBusinessByID(businessID) {
    return axios.get(baseUrl + `/businesses/${businessID}`)
  },
  getReviews(businessID) {
    return axios.get(baseUrl + `/reviews/${businessID}`)
  },
  addFavorites(businessID) {
    return axios.post(baseUrl + `/favorites/${businessID}`)
  },
  getFavorites(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get(baseUrl + "/favorites")
        return axios.get('/favorites')
        .then((response) => {
        console.log(response);
      });
  },
  deleteFavorites(businessID) {
    return axios.delete(`/favorites/${businessID}`)
  }
}
