import React from 'react';

import classes from './BuildControls.css';
import cart_builder_control from './cart_builder_control/cart_builder_control';

const controls = [
    { label: 'Emerson', type: 'emerson' },
    { label: 'Minka', type: 'minka' },
    { label: 'Big Ass', type: 'big_ass' }
];

const buildControls = ( props ) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed( 2 )}</strong></p>
        {controls.map( ctrl => (
            <cart_builder_control
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded( ctrl.type )}
                // removed={() => props.ingredientRemoved( ctrl.type )}
                // disabled={props.disabled[ctrl.type]} 
            />
        ) )}
    </div>
);

export default buildControls;