import React from 'react';
import styled from 'styled-components';
import {StyledButton} from '../global/GlobalStyledComponents';
import UIGridItem from './UIGridItem';
import {StyledGrid} from '../global/GlobalStyledComponents';
import {media} from "../global/helperFunctions"

const TopArtists = ({className, topArtistsArr, getTopArtists}) => {
    return(
            <div className={className}>
            <h1>Top Artists:</h1>
            <StyledButton onClick={getTopArtists}>
                Check Top Artists
            </StyledButton>
            <div className="StyledGrid">
            {   
                topArtistsArr
                    .map((artist, i) => <UIGridItem 
                                            key={i}
                                            caption={`${i+1}: ${artist.name}`}
                                            link={artist.external_urls.spotify}
                                            art={artist.images[0].url}
                                        />
                    )
            }
            </div>
            </div>
    );
}

export default styled(TopArtists)`
      margin-top: 5rem;  
      max-width: 80%;
        margin: 0 auto;
      .StyledGrid{
        display: grid;
      }

      @media (min-width: 800px){
            .StyledGrid{
                grid-template-columns: 1fr 1fr 1fr;
            }
      }
      
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

`;

