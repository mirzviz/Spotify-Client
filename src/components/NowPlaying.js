import React, { Component } from 'react'

export class NowPlaying extends Component {

    
    render() {
        return (
            <>
                <h2>
                Now Playing: { this.state.nowPlaying.name }
                </h2>
                <div>
                <StyledImg src={this.state.nowPlaying.albumArt} alt="Currently Playing " />
                </div>
                { this.state.loggedIn &&
                <React.Fragment>
                <StyledButton onClick={this.getNowPlaying}>
                    Check Now Playing
                </StyledButton>
                <ImageTextGrid tracksArr={this.state.lastPlayedTracks}/>
                </React.Fragment>
                }
            </>
        )
    }
}

export default NowPlaying
