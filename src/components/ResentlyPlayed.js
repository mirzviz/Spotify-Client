import React from 'react';
import style from 'styled-components';
import {StyledImg, StyledButton} from '../global/styles';
import {Link} from 'react-router-dom';
import UIGridItem from './UIGridItem';

const StyledGrid = style.div`
    display: grid;
    grid-template-columns: auto auto auto;
`;


export default ({tracksArr, getResentlyPlayed}) => {
    return(
        <React.Fragment>
            <h1>Resently Played:</h1>
            <StyledButton onClick={getResentlyPlayed}>
                Check Resently Played
            </StyledButton>
            <StyledGrid>
            {   
                tracksArr
                    .map((track, i) => <UIGridItem 
                                            key={i}
                                            caption={track.name}
                                            link={track.linkToTrack}
                                            art={track.albumArt}
                                        />
                    )
            }
            </StyledGrid>
        </React.Fragment>
    );
}