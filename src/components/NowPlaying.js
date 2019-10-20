import React, { Component } from 'react';
import {StyledImg} from '../global/GlobalStyledComponents';
import {StyledButton} from '../global/GlobalStyledComponents';
import UIGridItem from '../components/UIGridItem';
import styled from 'styled-components';
import {colors} from '../global/helperFunctions'

 const NowPlaying = ({className, nowPlaying, getNowPlaying}) => {
    return (
        <div className={className}>
              <StyledButton onClick={getNowPlaying}>
                  Check Now Playing
               </StyledButton>
              <UIGridItem
                caption={"Now Playing: " + nowPlaying.name}
                link={nowPlaying.link}
                art={nowPlaying.albumArt}
              />
        </div>
    )
}

export default styled(NowPlaying)`

`;
