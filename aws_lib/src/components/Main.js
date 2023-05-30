import React from 'react'
import "../styles/Main.css"
import bookBtn from "../assets/BookBtn.png"
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faMarker, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
// import ImageGallery from 'react-image-gallery'

// const images = [
//     {
//         original: "../assets/available.png",
//         thumbnail: "../assets/available.png"
//     },
//     {
//         original: "../assets/backgroundLogin.png",
//         thumbnail: "../assets/backgroundLogin.png"
//     }
// ]

// class MyGallery extends React.Component{
//     render(){
//         return <ImageGallery items={images}></ImageGallery>
//     }
// }

function Main(){
    return(
        <div className='container'>
            <div className='carousel'>
                {/* <MyGallery></MyGallery> */}
                {/* <ImageGallery items={images}></ImageGallery> */}
            </div>
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
                        <FontAwesomeIcon className='logoBtn' icon={faNewspaper} size='6x'></FontAwesomeIcon>
                    </div>
                    <div id='blog'>
                        <div className='textContainer'>
                            <h2>Blog</h2>
                            <p>Share your experience and creativity or read others here</p>
                        </div>
                        <FontAwesomeIcon className='logoBtn' icon={faMarker} size='6x'></FontAwesomeIcon>
                    </div>
                </div>
                <Link to={"/bookpage"} style={{textDecoration:'none'}}>
                <div id='newCollections'>
                        <div className='textContainer'>
                            <h2>New Collections</h2>
                            <p>Find our new collection here</p>
                        </div>
                        <img src={bookBtn} alt=''></img>
                </div>
                </Link>
                
            </div>
        </div>
    )
}

export default Main;
