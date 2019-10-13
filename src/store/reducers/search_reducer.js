import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../updateObject';

const initialState = {
    show_products_page: false,
    hits: [],
    itemId: null,
    item_type: null,
    error: null,
    loading: false,
    doSearch: null,
    searchRedirectPath: '/'
};

// const searchStart = ( state, action ) => {
//     return updateObject( state, { error: null, loading: true } );
// }; 

const searchSuccess = (state, action) => {
    return updateObject( state, { 
        show_products_page: action.show_products_page,
        hits: action.hits,
        itemId: action.itemId,
        item_type: action.item_type,
        doSearch: action.doSearch,
        error: null,
        loading: false
     } );
};

// const searchFail = (state, action) => {
//     return updateObject( state, {
//         error: action.error,
//         loading: false
//     });
// };

// const setSearchRedirectPath = (state, action) => {
//     return updateObject(state, { searchRedirectPath: action.path })
// }

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        // case actionTypes.SEARCH_START: return searchStart(state, action);
        case actionTypes.SEARCH_SUCCESS: return searchSuccess(state, action);
    //     case actionTypes.SEARCH_FAIL: return searchFail(state, action);
        // case actionTypes.SET_SEARCH_REDIRECT_PATH: return setSearchRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;