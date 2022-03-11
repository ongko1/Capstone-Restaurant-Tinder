import * as ActionTypes from './actionTypes';

export const Businesses = (state = {
    isLoading: true,
    errMess: null,
    businesses: []
    
}, action) => {
switch (action.type) {
    case ActionTypes.ADD_BUSINESSES:
        return { ...state, isLoading:false, errMess:null, Businesses: action.payload  }
    
    case ActionTypes.BUSINESSES_LOADING:
            return{...state, isLoading: true, errMess: null, businesses: []}

    case ActionTypes.BUSINESSES_FAILED:
                return{...state, isLoading: false, errMess: action.payload, dishes: []}
    
    case ActionTypes.DELETE_BUSINESSES:
        return { ...state, id: null, username: '', authorities: [] }

    default:
        return state;
}
}