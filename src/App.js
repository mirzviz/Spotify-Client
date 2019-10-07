import React, {Component} from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import ImageTextGrid from './components/ImageTextGrid'
import style from 'styled-components';
import {StyledImg} from './global/styles';
import {StyledButton} from './global/styles';
import Header from './components/Header';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const {access_token} = this.getHashParams();
    if (access_token) {
      spotifyApi.setAccessToken(access_token);
    }
    this.state = {
      loggedIn: access_token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      lastPlayedTracks: []
    }
  }

  async componentDidMount(){
    if(this.state.loggedIn){
      try{
        const data = await spotifyApi.getMyRecentlyPlayedTracks();
        const lastPlayedArrOfTracks = 
              data.items.map(async item => {
                const track = await spotifyApi.getTrack(item.track.id);
                return {
                  name: track.name,
                  albumArt: track.album.images[0].url
                }});
        
        Promise.all(lastPlayedArrOfTracks)
          .then(data => {
            //console.log("settting state to", data);
            this.setState({lastPlayedTracks: data})
          })     
      }
      catch(err){
        console.log(err)
      }
    }
  };

  getNowPlaying = async () => {
    try{
      const reply = await spotifyApi.getMyCurrentPlaybackState();
      if(reply){
        this.setState({
          nowPlaying: {
            name: reply.item.name,
            albumArt: reply.item.album.images[0].url
          }
        });
      }
    }
    catch(e){console.log(e);}
    
  }

  getHashParams () {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <div className="App">

        <NavBar>
          about
          links
          tabs
        </NavBar>

        <Header/>

        <SignIn/>

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
        
      </div>

    );
  }

}

export default App;
