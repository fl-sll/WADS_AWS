import React from 'react'
import "../styles/footer.css"
import logo from "../assets/logo.png"
import instagram from "../assets/instagram.png"
import blogger from "../assets/blogger.png"
import facebook from "../assets/facebook.png"
import twitter from "../assets/twitter.png"

function Footer(){
    return(
        <div className='footerContainer'>
            <div className='footer'>
                <div className='leftFooter'>
                    <img src={logo} alt="" className='logoFooter'></img>
                    <p>copyright 2023</p>
                 </div>
                 <div className='midFooter'>
                  <h2>Find Us On</h2>
                  <div className='social'>
                    <img src={twitter} alt="" className='socialLogo'></img>
                    <img src={instagram} alt="" className='socialLogo'></img>
                    <img src={facebook} alt="" className='socialLogo'></img>
                    <img src={blogger} alt="" className='socialLogo'></img>
                  </div>
                </div>
                <div className='rightFooter'>
                    <div className='listFooter'>
                        <h2>Services</h2>
                        <p>Request Materials</p>
                        <p>Lost and Found</p>
                    </div>
                    <div className='listFooter'>
                        <h2>Research Help</h2>
                        <p>Style Guide</p>
                        <p>Research Library</p>
                    </div>
                    <div className='listFooter'>
                        <h2>Facilities</h2>
                        <p>Discussion Room</p>
                        <p>Reading Room</p>
                        <p>Multimedia Room</p>
                    </div>
                    <div className='listFooter'>
                        <h2>E-Collection</h2>
                        <p>Tempo</p>
                        <p>Scopus</p>
                        <p>Science Direct</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;