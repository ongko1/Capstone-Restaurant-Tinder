import * as ActionTypes from './actionTypes';

export const Restaurants = (state = {
    restaurants:[],
    restaurant: {
        id: '',
        name: '',
        image_url: '',
        url: '',
        review_count: Number,
        categories: [],
        rating: Number,
        location: [],
        display_phone: '',
        price: ''
    }
}, action) => {
switch (action.type) {
    case ActionTypes.ADD_RESTAURANTS:
        return { ...state, id: action.payload.id, name: action.payload.name,
             image_url: action.payload.image_url, url: action.payload.url, review_count: action.payload.review_count,
            categories: action.payload.categories, rating: action.payload.categories, rating: action.payload.rating,
        location: action.payload.location, display_phone: action.payload.display_phone, price: action.payload.price }
    
    case ActionTypes.DELETE_RESTAURANTS:
        return { ...state, id: null, username: '', authorities: [] }

    default:
        return state;
}
}