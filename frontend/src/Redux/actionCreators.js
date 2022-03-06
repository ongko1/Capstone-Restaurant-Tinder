import { yelpUrl } from '../Components/Shared/yelpUrl';
import * as ActionTypes from './actionTypes'
import {yelpService} from '../Components/services/yelpService'
import axios from 'axios';

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

export const fetchBusinesses = () => (dispatch) => {

    axios.post(yelpUrl + '/businesses/search')
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
