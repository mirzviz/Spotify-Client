import React, {Component} from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import ResentlyPlayed from './components/History'
import {StyledButton} from './global/GlobalStyledComponents';
import Header from './components/Header';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import NowPlaying from './components/NowPlaying'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TopArtists from './components/TopArtists';
import GlobalStyles from './global/GlobalStyles';
import Banner from './components/Banner';
import Artist from './components/Artist';
import SongInfo from './components/SongInfo'


const spotifyApi = new SpotifyWebApi();

//http://localhost:8888/refresh_token?refresh_token=AQCtXFaSYVTJ_r9BFHFI8IKHVOcdE2RkG6a2ppBY8LhuHlXbY3hLt8sk02yoZUFwuF2LgYFIPOsjSyyFuAydRrblJnVSUUXuCBhDJ_wK2obME_uEASqyJ5yJBUTJ3XutJanA2g
const code = `

`;
class App extends React.Component {
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
      topArtists: [],
      usersName: null
    };
  }

  async componentDidMount(){
    if(this.state.loggedIn){
      let me = await spotifyApi.getMe();
      this.setState({
        usersName: me.display_name
      });
    }
  };

  getTopArtists = async () => {
    if(this.state.loggedIn){
      try{
        let reply = await spotifyApi.getMyTopArtists({limit: 50});
        this.setState({
          topArtists: reply.items
        });
      }
      catch(e){
        console.log(e);
      }
    }
  }

  getResentlyPlayed = async () => {
    if(this.state.loggedIn){
      try{
        const data = await spotifyApi.getMyRecentlyPlayedTracks({limit: 50});
        const lastPlayedArrOfTracks = 
              data.items.map(item => (
                {
                  id: item.track.id,
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
        <GlobalStyles></GlobalStyles>
        <Router>
          <Banner
            greeting="welcome to"
            title="Spotifity"
            text="Your Spotify Friend"
          />
          <NavBar>home history top-artists</NavBar>
          
          <Switch>

            <Route path="/signin" exact>
              <SignIn/>
            </Route>

            <Route path="/history" exact>
              <ResentlyPlayed 
                tracksArr={this.state.lastPlayedTracks}
                getResentlyPlayed={this.getResentlyPlayed}
              />
            </Route>

            <Route path="/history/:id" component={SongInfo}/>

            <Route path="/top-artists" exact>
              <TopArtists
                topArtistsArr={this.state.topArtists}
                getTopArtists={this.getTopArtists}
              />
            </Route>

            <Route path="/top-artists/:id" component={Artist}/>

            <Route path="/home" exact>
              <Header 
                img={this.state.topArtists.length != 0 ? this.state.topArtists[0].images[0].url : null }
                text={this.state.usersName ? `Welcome ${this.state.usersName}!` : null}
              />
              <StyledButton onClick={this.refreshTheToken}>refesh access token</StyledButton>
              { this.state.loggedIn &&
                <>
                    <NowPlaying 
                      nowPlaying={this.state.nowPlaying}
                      getNowPlaying={this.getNowPlaying} 
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
