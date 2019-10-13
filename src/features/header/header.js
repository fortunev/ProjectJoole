import React from 'react';

import classes from './header.module.css';
import NavigationItem from '../../components/navigation/navigationItem/navigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>        
        <div className={classes.projects}>            
            <NavigationItem link="/projects" exact>Projects</NavigationItem>            
            <img src={require('../../images/'+localStorage.getItem('image'))} alt="logo" className={classes.profile_img}/>                        
            {/* <NavigationItem link="/logout" exact className={classes.logout_link}>Log out</NavigationItem>
            <NavigationItem link="/home" exact className={classes.logout_link}>Home</NavigationItem> */}
        </div>  
    </ul>
);

export default navigationItems;