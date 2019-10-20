import React from 'react';
import styled from 'styled-components';
import {StyledButton} from '../global/GlobalStyledComponents';
import UIGridItem from './UIGridItem';
import {StyledGrid, setColor, setLetterSpacing} from '../global/GlobalStyledComponents';



const ResentlyPlayed = ({className , tracksArr, getResentlyPlayed}) => {
    return(
        <div className={className}>
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
        </div>
    );
}

export default styled(ResentlyPlayed)`
    margin-top: 5rem;
`