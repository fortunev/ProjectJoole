import React from 'react';
import ProductListing from '../features/product-listing';
import data from '../data/products.json';
import NavigationItem from '../components/navigation/navigationItem/navigationItem';

export default function Homepage (props) {
    return <div>
        <div><NavigationItem link="/logout" exact>Log out</NavigationItem>  </div>    
        <h1>Home Page</h1>
        <ProductListing products={data.products} />
    </div>
}