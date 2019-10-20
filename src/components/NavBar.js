import React from 'react';
import { Link } from 'react-router-dom';
import style from 'styled-components';
import {setTransition, setFont, setRem} from '../global/helperFunctions';


export default function NavBar({children}) {
    const childrenNavItems = // every child into <Link> going to relative path of child
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


const StyledNavBar = style.div`
    ${setFont.slanted}
    font-size: ${setRem(18)};
    overflow: hidden;
    background: #333;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    display: grid;
    grid-template-columns: ${props => {
        var str = "";
        var i;
        for(i = 0; i < props.numOfElements; i++){
			str = str + '1fr '
        }
        console.log(str);
        return str;
    }};
    min-height: 4vh;
    opacity: 0.8;
`;

const NavBarItem = style.div`
    display: block;
    color: #f2f2f2;
    padding: 1rem 2rem;
    text-transform: uppercase;
    text-decoration: underline;
    letter-spacing: 3px;
    :hover {
        background: #ddd;
        color: black;
    }
    ${setTransition}
`;
