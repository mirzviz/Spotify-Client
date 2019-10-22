import React from 'react'
import styled from 'styled-components';
import {StyledButton} from '../global/GlobalStyledComponents';
import { setBackground, setLetterSpacing, setShadow, setTransition } from '../global/helperFunctions';

const SignIn = ({className}) => {
    return (
        <div className={className}>
            <a href='http://localhost:8888/login'>
            <StyledButton className="but" href='http://localhost:8888/login' >
                Login to Spotify 
            </StyledButton>
            </a>
        </div>
    )
}

export default styled(SignIn)`
    overflow: hidden;
    background: linear-gradient(to right, #ba5370, #f4e2d8); 
    height: 100vh;
    .but{
        height: 70vh;
        width: 70vh;
        font-size: 3rem;
        &:hover{
            opacity: 0.5;
        }
        ${setLetterSpacing(20)}
        ${setShadow.darkest}
        ${setTransition}
    }
`;
