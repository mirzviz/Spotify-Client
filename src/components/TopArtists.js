import React from 'react';
import styled from 'styled-components';
import {StyledButton} from '../global/GlobalStyledComponents';
import {Link} from 'react-router-dom';
import UIGridItem from './UIGridItem';
import {StyledGrid} from '../global/GlobalStyledComponents';

const TopArtists = ({className, topArtistsArr, getTopArtists}) => {
    return(
            <div className={className}>
            <h1>Top Artists:</h1>
            <StyledButton onClick={getTopArtists}>
                Check Top Artists
            </StyledButton>
            <StyledGrid>
            {   
                topArtistsArr
                    .map((artist, i) => <UIGridItem 
                                            key={i}
                                            caption={artist.name}
                                            link={artist.external_urls.spotify}
                                            art={artist.images[0].url}
                                        />
                    )
            }
            </StyledGrid>
            </div>
    );
}

export default styled(TopArtists)`
      margin-top: 5rem;  
`;

