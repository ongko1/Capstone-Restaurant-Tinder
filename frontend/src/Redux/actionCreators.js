
import * as ActionTypes from './actionTypes'
import {yelpService} from '../Components/services/yelpService'
import axios from 'axios';
import { baseUrl } from '../Components/Shared/baseUrl';
import { type } from '@testing-library/user-event/dist/type';


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


export const getBusinessByID = (businessID) => (dispatch) => {
    axios.get(`/businesses/${businessID}`)
        .catch(response => {
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
        .then(response => response.json())
        .then(businesses => dispatch(addBusinesses(businesses)))
    
  }

export const addBusinesses = (businesses) => ({
    type: ActionTypes.ADD_BUSINESSES,
    payload: businesses
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
    