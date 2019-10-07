import React from 'react'
import {StyledNavBar, NavBarItem} from '../global/styles';


export default function NavBar({children}) {
    const childrenNavItems = 
    children.split(' ').map(el => <NavBarItem>{el}</NavBarItem>);
    
    const numOfElements = childrenNavItems.length;
    
    return (
            <StyledNavBar numOfElements={numOfElements}>
                { childrenNavItems }
            </StyledNavBar>
    )
}
