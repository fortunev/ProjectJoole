import * as actionTypes from './actionTypes';

export const addItemToCart = ( name ) => {
    return {
        type: actionTypes.ADD_ITEM_TO_CART,
        ingredientName: name
    };
};