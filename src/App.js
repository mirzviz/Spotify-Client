import React, {Component} from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import ImageTextGrid from './components/ImageTextGrid'

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
            console.log("settting state to", data);
            this.setState({lastPlayedTracks: data})
          })     
      }
      catch(err){
        console.log(err)
      }
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
        <h2>
          Now Playing: { this.state.nowPlaying.name }
        </h2>
        <div>
          <img src={this.state.nowPlaying.albumArt} alt="Currently Playing " style={{ height: 200, width: 200, borderRadius: '30%', padding: '10px'}}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
        <h2>resently played:</h2>
        <ImageTextGrid tracksArr={this.state.lastPlayedTracks}/>
      </div>

    );
  }

}

export default App;
