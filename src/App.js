import React, {Component} from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import ResentlyPlayed from './components/ResentlyPlayed'
import style from 'styled-components';
import {StyledImg} from './global/styles';
import {StyledButton} from './global/styles';
import Header from './components/Header';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import NowPlaying from './components/NowPlaying'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const spotifyApi = new SpotifyWebApi();


//http://localhost:8888/refresh_token?refresh_token=AQCtXFaSYVTJ_r9BFHFI8IKHVOcdE2RkG6a2ppBY8LhuHlXbY3hLt8sk02yoZUFwuF2LgYFIPOsjSyyFuAydRrblJnVSUUXuCBhDJ_wK2obME_uEASqyJ5yJBUTJ3XutJanA2g

class App extends Component {
  constructor(){
    super();
    const {access_token, refresh_token} = this.getHashParams();
    if (access_token) {
      spotifyApi.setAccessToken(access_token);
    }
    this.state = {
      accessToken: access_token,
      refreshToken: refresh_token,
      loggedIn: access_token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      lastPlayedTracks: [],
      topTracks: null,
      usersName: null
    };
  }

  async componentDidMount(){
    let me = await spotifyApi.getMe();

    let reply = await spotifyApi.getMyTopArtists();
    this.setState({
      topTracks: reply.items,
      usersName: me.display_name
    });
    console.log(reply);
  };

  getResentlyPlayed = async() => {
    if(this.state.loggedIn){
      try{
        const data = await spotifyApi.getMyRecentlyPlayedTracks();
        const lastPlayedArrOfTracks = 
              data.items.map(item => (
                {
                  name: item.track.name,
                  albumArt: item.track.album.images[0].url,
                  linkToTrack: item.track.external_urls.spotify
                }));
        this.setState({lastPlayedTracks: lastPlayedArrOfTracks});
      }
      catch(err){
        console.log(err)
      }
    }
  }

  refreshTheToken = async () => {
    try{
      const newAccessToken = await fetch(`http://localhost:8888/refresh_token?refresh_token=${this.state.refreshToken}`);
      const newAccessTokenJson = await newAccessToken.json();
      spotifyApi.setAccessToken(newAccessTokenJson.access_token);
      this.setState({accessToken: newAccessTokenJson.access_token});
    }
    catch(e){
      console.log(e);
    }
  }

  getNowPlaying = async () => {
    try{
      const reply = await spotifyApi.getMyCurrentPlaybackState();
      if(reply){
        this.setState({
          nowPlaying: {
            name: reply.item.name,
            albumArt: reply.item.album.images[0].url,
            link: reply.item.external_urls.spotify
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

        <Router>
          <Switch>
            <Route path="/signin" exact>
              <SignIn/>
            </Route>
            
            <Route path="/" exact>

              <NavBar>
                about
                links
                tabs
              </NavBar>

              <Header 
                img={this.state.topTracks ? this.state.topTracks[0].images[0].url : null }
                text={this.state.usersName ? `Welcome ${this.state.usersName}!` : null}
              />

              {/* <SignIn/> */}
              <StyledButton onClick={this.refreshTheToken}>refesh access token</StyledButton>




              { this.state.loggedIn &&
                <>
                    <NowPlaying 
                      nowPlaying={this.state.nowPlaying}
                      getNowPlaying={this.getNowPlaying} />
                    <ResentlyPlayed 
                      tracksArr={this.state.lastPlayedTracks}
                      getResentlyPlayed={this.getResentlyPlayed}
                      />
                </>
              }

          </Route>
        </Switch>
      </Router>

        
        
      </div>

    );
  }

}

export default App;
