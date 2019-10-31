import React from 'react';
import styled from 'styled-components';
import {StyledButton} from '../global/GlobalStyledComponents';
import UIGridItem from './UIGridItem';
import {media} from "../global/helperFunctions"

const History = ({className , tracksArr, getResentlyPlayed}) => {
    return(
        <div className={className}>
            <h1>Playing History:</h1>
            <StyledButton onClick={getResentlyPlayed}>
                Check Resently Played
            </StyledButton>
            <div className="StyledGrid">
            {   
                tracksArr
                    .map((track, i) => <UIGridItem 
                                            key={i}
                                            id={track.id}
                                            caption={`${i+1}: ${track.name}`}
                                            art={track.albumArt}
                                        />
                    )
            }
            </div>
        </div>
    );
}

export default styled(History)`
    margin-top: 5rem;
    max-width: 80%;
    margin: 0 auto;
    .StyledGrid{
        display: grid;
        /* grid-template-columns: 1fr 1fr; */
    }   

    /* @media (min-width: 800px){
            .StyledGrid{
                grid-template-columns: 1fr 1fr 1fr;
            }
      } */

    ${media.phone` 
        .StyledGrid{
            grid-template-columns: 1fr;
        }
        `
    }
    ${media.tablet` 
        .StyledGrid{
            grid-template-columns: 1fr 1fr;
        }
        `
    }
    ${media.desktop` 
        .StyledGrid{
            grid-template-columns: 1fr 1fr 1fr;
        }
        `
    }
    ${media.large` 
        .StyledGrid{
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        `
    }
`