
import * as ActionTypes from './actionTypes'
import axios from 'axios';
import { baseUrl } from '../Components/Shared/baseUrl';
import { type } from '@testing-library/user-event/dist/type';
import yelpService from '../Components/services/yelpService';


export const addToken = (token) => ({
    type: ActionTypes.ADD_TOKEN,
    payload: token
});

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
})

export const deleteUser = () => ({
    type: ActionTypes.DELETE_USER
})

export const fetchFavorites = () => (dispatch,token) => {
    dispatch(favoritesLoading(true));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get(baseUrl + "/favorites")
        .then(response => {
          if (response.ok) {
              return response;
          }
          else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
          }
      },
      error => {
          var errmess = new Error(error.message);
          throw errmess;
      })
      .then(response => response)
      .then(favorites => dispatch(addFavorites(favorites)))
      .catch(error => dispatch(businessesFailed(error.message)));
         
}


export const addBusinesses = (businesses) => ({
    type: ActionTypes.ADD_BUSINESSES,
    payload: businesses
});

export const businessesLoading = () => ({
    type: ActionTypes.BUSINESSES_LOADING
});

export const businessesFailed = (errmess) => ({
    type: ActionTypes.BUSINESSES_FAILED,
    payload: errmess
});

export const postFeedback = (username, password, passwordconfirm, ) => (dispatch) => {

    const newFeedback = {
        username: username,
        password: password,
        passwordconfirm: passwordconfirm,
        
    }


    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    });
}

    export const addRestaurants = (data) =>({
        type: ActionTypes.ADD_RESTAURANTS,
        payload:data
    })
    export const addFavorites = (favorites) => ({
        type: ActionTypes.ADD_FAVORITES,
        payload: favorites
    });
    
    export const favoritesLoading = (favorites) => ({
        type: ActionTypes.FAVORITES_LOADING
    });
    
    export const favoritesFailed = (errmess) => ({
        type: ActionTypes.FAVORITES_FAILED,
        payload: errmess
    });
    export const deleteFavorites = (businessID) => ({
        type: ActionTypes.DELETE_FAVORITES
    })
    
    