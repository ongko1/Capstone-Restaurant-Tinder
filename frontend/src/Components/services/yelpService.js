import axios from 'axios';

export default {

  getRestaurantsNoRadius(zipCode, category) {
    return axios.get(`/businesses`, {
      headers : {
        'zipCode': zipCode,
        'category': category,
        'radius': ''
      }
    })
  },
  getRestaurantsWithRadius(zipCode, category, radius) {
    return axios.get(`/businesses`, {
      headers : {
        'zipCode': zipCode,
        'category': category,
        'radius': radius
      }
    })
  },
  getBusinessByID(businessID) {
    return axios.get(`/businesses/${businessID}`)
  },
  getReviews(businessID) {
    return axios.get(`/reviews/${businessID}`)
  },
  addFavorites(businessID) {
    return axios.post(`/favorites/${businessID}`)
  },
  getFavorites(){
    return axios.get('/favorites')
  },
  deleteFavorites(businessID) {
    return axios.delete(`/favorites/${businessID}`)
  }
}
