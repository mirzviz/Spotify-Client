import styled, {keyframes} from'styled-components';
import React, { Component } from 'react'
import {Link} from 'react-router-relative-link';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class SongInfo extends Component {
    state = {
        songInfo: {}
    }

    async componentDidMount(){
        // const play = await spotifyApi.play();
        // console.log(play);
        const ans = await spotifyApi.getTrack(this.props.match.params.id);
        console.log(ans);
        this.setState({songInfo: ans})
    }

    render() {
        const {songInfo} = this.state;
        // console.log(songInfo);

        let floz = <div></div> //add spinner

        if(Object.keys(songInfo).length !== 0){
            floz = (
                <div>
                    <Link className='link' to='../'> 
                        go back
                    </Link>
                    <h1>{songInfo.name}</h1>
                    <a href={songInfo.external_urls.spotify} target="_blank">
                        <img src={songInfo.album.images[0].url}></img>
                    </a>
                    <ul>
                        <li>
                            <strong>popularity:</strong> {songInfo.popularity}
                        </li>
                        <li>
                            <strong>album name:</strong> {songInfo.album.name}
                        </li>
                        <li>
                            <strong>number of tracks in album:</strong> {songInfo.album.total_tracks}
                        </li>
                    </ul>
                </div>
            )
        }

        return (
            <div className={this.props.className}>{floz}</div>
        )
    }
}


export default styled(SongInfo)`
    margin: 2rem 10vw;
    li{
        font-size: 1.3rem;
    }
    .link{
        display: block;
        width: 30%;
        height: 2rem;
        background:"#740abf";
        color:"white";
        font-size: 1em;
        margin: 1em auto;
        padding: 0.25em 1em;
        border: 2px solid #740abf;
        border-radius: 3px;
    }
    ul{
        list-style-type: none;
        text-align: left;
    }
    img{
        width: 20rem;
        height: 20rem;
        border-radius: 20px;
        margin-bottom: 3rem;
    }
`;
