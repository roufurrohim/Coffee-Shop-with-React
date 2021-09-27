import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import productsReducer from './reducers/products'
import userReducer from './reducers/user'
import cartReducer from './reducers/cart';
import historyReducer from './reducers/history';

const reducers = combineReducers({
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    history: historyReducer,
})

const middleware = applyMiddleware(thunk, logger)
const store = createStore(reducers, middleware)

export default store