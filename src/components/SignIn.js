import React from 'react'
import {StyledButton} from '../global/styles';

export default function SignIn() {
    return (
        <div>
            <a href='http://localhost:8888'>
            <StyledButton primary href='http://localhost:8888' >
                Login to Spotify 
            </StyledButton>
            </a>
        </div>
    )
}
