import React from 'react';
import style from 'styled-components';
import {StyledImg} from '../global/styles'

const StyledGrid = style.div`
    display: grid;
    grid-template-columns: auto auto auto;
`;


export default ({tracksArr}) => {
    return(
        <React.Fragment>
            <h2>resently played:</h2>
            <StyledGrid>
            {   
                tracksArr
                    .map((track, i) => <div className='grid-item' key={i}>
                                            <h4>{track.name}</h4>
                                            <StyledImg
                                                src={track.albumArt} 
                                                alt={track.name}
                                            />
                                            </div>)
            }
            </StyledGrid>
        </React.Fragment>
    );
}