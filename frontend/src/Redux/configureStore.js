import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
            rejects:[],
            favorites:[],
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
        }),
        applyMiddleware(thunk)
    );

    return store;
}