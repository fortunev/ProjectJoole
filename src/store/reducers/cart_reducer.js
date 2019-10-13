// eslint-disable-next-line
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../updateObject';
// eslint-disable-next-line
const initialState = {
    items: null,
    totalPrice: null,
    error: false
}

const ITEM_PRICES = {
    emerson: 50,
    mika: 20,
    westinghouse: 80
}

const cartWithoutItem = (cart, item) => cart.filter(cartItem => cartItem.id !== item.id);
const itemInCart = (cart, item) => cart.filter(cartItem => cartItem.id === item.id)[0];

const addToCart = (cart, item) => {
    const cartItem = itemInCart (cart, item);
    return cartItem === undefined
        ? [...cartWithoutItem(cart, item), {...item, quantity: 1}]
        : [...cartWithoutItem(cart, item), {...cartItem, quantity: cartItem.quantity + 1}];
}
// eslint-disable-next-line
const addItemToCart = ( state, action ) => {
    const updatedItem = { [action.itemName]: state.items[action.itemName] + 1 }
    const updatedItems = updateObject( state.ingredients, updatedItem );
    const updatedState = {
        ingredients: updatedItems,
        totalPrice: state.totalPrice + ITEM_PRICES[action.itemName]
    }
    return updateObject( state, updatedState );
};

const cartReducer = (state=[], action) => {
    switch(action.type){
        case 'ADD':
            return addToCart(state, action.payload);
        case 'REMOVE':
            const firstMatchIndex = state.indexOf(action.payload);
            return state.filter((item, index) => index !== firstMatchIndex);
        default:
            return state;
    }
}

// const reducer = ( state = initialState, action ) => {
//     switch ( action.type ) {
//         case actionTypes.ADD_ITEM_TO_CART: return addItemToCart( state, action );
//         // case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
//         // case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);    
//         // case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
//         default: return state;
//     }
// };

export default cartReducer;