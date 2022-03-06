import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'
import {Businesses} from './businesses'


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
            businesses: Businesses,
            
        }),
        applyMiddleware(thunk)
    );

    return store;
}