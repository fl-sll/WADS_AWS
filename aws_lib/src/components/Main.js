import React from 'react'
import "../styles/Main.css"
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faMarker} from '@fortawesome/free-solid-svg-icons'

function Main(){
    return(
        <div>
            <div className='carousel'></div>
            <div className='searchBar'></div>
            <div className='buttons'>
                <div className='newsBlog'>
                    <div id='news'>
                        <div className='textContainer'>
                            <h2>News</h2>
                            <p>Read local and international news</p>
                        </div>
                        <FontAwesomeIcon icon={faNewspaper}></FontAwesomeIcon>
                    </div>
                    <div id='blog'>
                        <div className='textContainer'>
                            <h2>News</h2>
                            <p>Share your experience and creativity or read others here</p>
                        </div>
                        <FontAwesomeIcon icon={faMarker}></FontAwesomeIcon>
                    </div>
                </div>
                <div id='newCollections'>
                        <div className='textContainer'>
                            <h2>New Collections</h2>
                            <p>Find our new collection here</p>
                        </div>
                        <FontAwesomeIcon icon={faMarker}></FontAwesomeIcon>
                    </div>
            </div>
        </div>
    )
}

export default Main;

