import React from 'react';
import {StyledImg} from '../global/styles';
import style from 'styled-components';


export default function UIGridItem({caption, link, art}) {
    return <div className='grid-item' >
                <h3>{caption}</h3>
                <a href={link} target="_blank" >
                    <StyledImg
                        src={art} 
                        alt={caption}
                    />
                </a>
            </div>
    
}
