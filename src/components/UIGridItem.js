import React from 'react';
import {StyledImg} from '../global/GlobalStyledComponents';
import styled from 'styled-components';


const UIGridItem = ({className, caption, link, art}) => {
    return <div className={className} >
                <h3>{caption}</h3>
                <a href={link} target="_blank" >
                    <StyledImg
                        src={art} 
                        alt={caption}
                    />
                </a>
            </div>
    
}

export default styled(UIGridItem)`
`;
