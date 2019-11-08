import { combineReducers } from 'redux';

var defaultRecords = [];
var defaultQuantities = {};

const cartItemsReducer = (state = defaultRecords, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const itemExists = state.includes(action.record);
            if (itemExists) {
                return state;
            } else {
                return [...state, action.record];
            }
        case 'REMOVE_FROM_CART':
            return state.filter(item => item.id !== action.record.id);
        default:
            return state;
    }
}

const cartQuantityReducer = (state = defaultQuantities, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const itemId = action.record.id;
            return { ...state, [itemId]: (state[itemId] || 0) + 1 };
        case 'INCREASE_QUANTITY':
            const iId = action.record.id;
            return { ...state, [iId]: (state[iId] || 0) + 1 };
        case 'REMOVE_FROM_CART':
            const iii = action.record.id;
            var newState = state;
            delete newState[iii];
            return newState;
        case 'DECREASE_QUANTITY':
            const iiii = action.record.id;
            if (state[iiii] === 1) {
                var nState = state;
                delete nState[iiii];
                console.log(nState);
                return nState;
            } else {
                return { ...state, [iiii]: (state[iiii] || 0) - 1 };
            }
        default:
            return state;
    }
};

const cartReducer = combineReducers({
    cartItems: cartItemsReducer,
    cartQuantities: cartQuantityReducer
});

export default cartReducer;