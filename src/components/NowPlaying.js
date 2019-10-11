import React, { Component } from 'react';
import {StyledImg} from '../global/styles';
import {StyledButton} from '../global/styles';
import UIGridItem from '../components/UIGridItem';

export default function NowPlaying({nowPlaying, getNowPlaying}) {
    return (
        <>
              <StyledButton onClick={getNowPlaying}>
                  Check Now Playing
               </StyledButton>
              <UIGridItem
                caption={"Now Playing: " + nowPlaying.name}
                link={nowPlaying.link}
                art={nowPlaying.albumArt}
              />
        </>
    )
}
