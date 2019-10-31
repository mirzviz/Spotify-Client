import styled, {keyframes} from'styled-components';
import React, { Component } from 'react'
import {Link} from 'react-router-relative-link';
import SpotifyWebApi from 'spotify-web-api-js';
import {StyledButton} from '../global/GlobalStyledComponents'
const spotifyApi = new SpotifyWebApi();

class Artist extends Component {
    state = {
        artistInfo: {}
    }

    async componentDidMount(){
        const ans = await spotifyApi.getArtist(this.props.match.params.id);
        this.setState({artistInfo: ans})
    }

    render() {
        const {artistInfo} = this.state;
        // console.log(artistInfo);

        let floz = <div></div> //add spinner

        if(Object.keys(artistInfo).length !== 0){
            floz = (
                <div>
                    <Link className='link' to='../'> 
                        go back
                    </Link>
                    <h1>{artistInfo.name}</h1>
                    <a href={artistInfo.external_urls.spotify} target="_blank">
                        <img src={artistInfo.images[0].url}></img>
                    </a>
                    <ul>
                        <li>
                            <strong>popularity:</strong> {artistInfo.popularity}
                        </li>
                        <li>
                            <strong>genres:</strong> {artistInfo.genres.join(', ')}
                        </li>
                        <li>
                            <strong>number of followers:</strong> {artistInfo.followers.total}
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


export default styled(Artist)`
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
