import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'
import {Businesses} from './businesses'
import { createForms } from 'react-redux-form'
import { InitialFeedback } from './forms'
import logger from 'redux-logger'
import { Favorites } from './favorites'


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
            businesses: Businesses,
            favorites: Favorites,
            ... createForms({
                feedback: InitialFeedback
            })
            
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}