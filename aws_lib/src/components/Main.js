import React from 'react'
import "../styles/Main.css"
// import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faMarker, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

function Main(){
    return(
        <div className='container'>
            <div className='carousel'></div>
            <div className='searchBar'>
                <p>Search our collections</p>
                <input type='text' placeholder='Search' id='searchInput'></input>
                <button className='searchBtn'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                </button>
            </div>
            <div className='buttons'>
                <div className='newsBlog'>
                    <div id='news'>
                        <div className='textContainer'>
                            <h2>News</h2>
                            <p>Read local and international news</p>
                        </div>
                        <FontAwesomeIcon icon={faNewspaper} ></FontAwesomeIcon>
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

