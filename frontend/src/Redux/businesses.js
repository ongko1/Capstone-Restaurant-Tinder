import * as ActionTypes from './actionTypes';

export const Businesses = (state = {
    id: null,
    name:'',
    image_url:'',
    is_closed:'',
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
        return { ...state, Businesses: action.payload  }
    
    case ActionTypes.DELETE_BUSINESSES:
        return { ...state, id: null, username: '', authorities: [] }

    default:
        return state;
}
}