import recordReducer from './records';
import cartReducer from './cart';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    records: recordReducer,
    cart: cartReducer
});

export default rootReducer;