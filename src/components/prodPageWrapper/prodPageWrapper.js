import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductDetail from '../../features/product_detail/product_detail';

class ProductPageWrapper extends Component {
  constructor(props){
    super(props);
    console.log(props);
    console.log(this.state);
  }
  render() {
    // console.log(this.props.location.pathname.split("/search/").pop());
    const product = this.props.products_.find((p) => {
      return p.id == this.props.location.pathname.split("/search/").pop();
    });

    return product ? (
      <ProductDetail
        product={product} />
    ) : (
      <div className="text-center">
          {/* <ProductDetail
        product={product} /> */}
        <h1>The product couldn't be found.</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        products_: state.search.hits,
        show_products_page: state.search.show_products_page
    };
};
export default connect(mapStateToProps,null)(ProductPageWrapper);