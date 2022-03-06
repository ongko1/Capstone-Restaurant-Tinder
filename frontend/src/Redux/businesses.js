import * as ActionTypes from './actionTypes';

export const Businesses = (state = {
    id: null,
    name:'',
    image_url:'',
    url:'',
    review_count: null,
    categories:[],
    rating: null,
    location: '',
    display_phone:'',
    price:'',
    errMess: null,
    
}, action) => {
switch (action.type) {
    case ActionTypes.ADD_BUSINESSES:
        return { ...state, isloading: false, errmess: null, restaurants: action.payload  }
    
    case ActionTypes.DELETE_BUSINESSES:
        return { ...state, id: null, username: '', authorities: [] }

    default:
        return state;
}
}