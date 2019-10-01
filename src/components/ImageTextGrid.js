import React from 'react';
import './ImageTextGrid.css';

export default ({tracksArr}) => {
    const imgStyle = {
        borderRadius: '30%',
        width: '200px'
    }

    return(
        <div className='grid-container'>
        {   
             tracksArr
                .map((track, i) => <div className='grid-item' key={i}>
                                        <h4>{track.name}</h4>
                                        <img src={track.albumArt} 
                                            alt={track.name}
                                            style={imgStyle}/>
                                        </div>)
        }
        </div>
    );
}