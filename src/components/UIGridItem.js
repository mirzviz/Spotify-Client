import React from 'react';
import {StyledImg} from '../global/GlobalStyledComponents';
import styled from 'styled-components';
import {setTransition} from '../global/helperFunctions';

 const StyledImg2 = styled.img`
    border-radius: 50%;
    width: 200px;
    height: 200px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const UIGridItem = ({className, caption, link, art}) => {
    return <div className={className} >
                <h3>{caption}</h3>
                <a href={link} target="_blank" >
                    <img
                        src={art} 
                        alt={caption}
                    />
                </a>
            </div>
    
}

export default styled(UIGridItem)`
    img{
        ${setTransition}
        border-radius: 50%;
        width: 10em;
        height: 10em;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    img:hover{
        transform: rotate(360deg);
    }
`;
