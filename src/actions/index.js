export const selectRecord = record => {
    return {
        type: 'SELECT_RECORD',
        record
    }
};

export const deselectRecord = () => {
    return {
        type: 'DESELECT_RECORD'
    }
};

export const addToCart = record => {
    return {
        type: 'ADD_TO_CART',
        record
    }
};

export const removeFromCart = record => {
    return {
        type: 'REMOVE_FROM_CART',
        record
    }
};

export const addQuantity = record => {
    return {
        type: 'INCREASE_QUANTITY',
        record
    }
};

export const removeQuantity = record => {
    return {
        type: 'DECREASE_QUANTITY',
        record
    }
};