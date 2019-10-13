import React from 'react';

const buildControl = (props) => (
    <div>
        <button 
            onClick={props.added}>Add To Cart</button>
    </div>
);

export default buildControl;