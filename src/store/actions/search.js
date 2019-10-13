import axios from 'axios';

import * as actionTypes from './actionTypes';

// export const searchStart = () => {
//     return {
//         type: actionTypes.SEARCH_START
//     };
// };

export const searchSuccess = (hits, itemId, item_type) => {
    return {
        type: actionTypes.SEARCH_SUCCESS,
        show_products_page: true,
        hits: hits,
        itemId: itemId,
        item_type: item_type,
        doSearch: true
    };
};

// export const searchFail = (error) => {
//     return {
//         type: actionTypes.SEARCH_FAIL,
//         error: error
//     };
// };

// export const setSearchRedirectPath = (path) => {
//     return {
//         type: actionTypes.SET_SEARCH_REDIRECT_PATH,
//         path: path
//     };
// };

// export const searchCheckState = () => {
//     return dispatch => {
//         console.log(localStorage.getItem('item_type'));
//         if(localStorage.getItem('item_type') !== ''){
//             console.log("IN IF - "+localStorage.getItem('item_type'));
//             dispatch(searchSuccess(localStorage.getItem('itemId'), localStorage.getItem('item_type')));
//         }
//     };
// };

export const search = (itemId, item_type, hits) => {
    return dispatch => {
        console.log("doSearch - " +itemId+" "+item_type+" hits: "+hits);
        // dispatch(searchStart());
        const searchData = {
            itemId: itemId,
            item_type: item_type
        };

        // axios.get('http://localhost:8080/api/fans/' + 'fans')
        // .then(result => {
        //     console.log(result);
        //     this.setState({
        //     hits: result.data,
        //     isLoading: false
        // })
        // })
        // .catch(error => {

        // }
        //     this.setState({
        //     error,
        //     isLoading: false
        // })
        // );
        // localStorage.setItem('item_type', item_type);
        // localStorage.setItem('itemId', itemId);
        dispatch(searchSuccess(hits,itemId, item_type));
        // dispatch(setSearchRedirectPath('/home'));
    }
}