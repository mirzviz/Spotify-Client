import React from 'react'
import {StyledNavBar, NavBarItem} from '../global/styles';
import { Link } from 'react-router-dom';

export default function NavBar({children}) {
    const childrenNavItems = 
    children.split(' ')
        .map((el,i) => 
                <Link to={el}
                    key={i}>
                        <NavBarItem>{el}</NavBarItem>
                </Link>);
    
    const numOfElements = childrenNavItems.length;
    
    return (
            <StyledNavBar numOfElements={numOfElements}>
                { childrenNavItems }
            </StyledNavBar>
    )
}
