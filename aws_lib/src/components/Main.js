import React from 'react'
import "../styles/Main.css"
import bookBtn from "../assets/BookBtn.png"
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faMarker, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import Carousel from "./Carousel"


function Main(){
    const slides = [
        {url:"https://riba-prd-assets.azureedge.net/-/media/Riba/Images/Block-Images/Reading-room-promo-image.jpg?rev=1e9d0af0e7dd43308ecb60e34a9b86bc&h=613&w=956&la=en&hash=83F6A6C9CA46CB126B07868125880AA5", title: 'library1'},
        {url:"https://assets.weforum.org/article/image/JMF96ETfn1kSViVnUou1Z0XIDwWcPpT5mrPc7-ytpAc.jpg", title: 'library2'},
        {url:"https://i.pinimg.com/736x/03/f1/bd/03f1bd269a5eaceb87e77da976d6c5f9.jpg", title: 'library3'}
    ]
    return(
        <div className='container'>
            <div className='carousel'>
                <Carousel slides = {slides}/>
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
