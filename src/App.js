import React, {Component} from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';

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
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }

  componentDidMount(){
    if(this.state.loggedIn){
      spotifyApi.getMyRecentlyPlayedTracks()
      .then(ans => console.log(ans))
      .catch(err => console.log(err))
      
    }
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then(res => {
        if(res){
          this.setState({
            nowPlaying: {
              name: res.item.name,
              albumArt: res.item.album.images[0].url
            }
          });
        }
      })
      .catch(err=>console.log(err))
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
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
      </div>
    );
  }

}

export default App;
