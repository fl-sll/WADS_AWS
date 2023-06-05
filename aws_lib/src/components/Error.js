import Footer from './footer'
import Navbar from './navbar'
import Under from './under'
import "../styles/error.css"

function Error(){
    return(
        <div>
            <Navbar page="/dashboard"></Navbar>
            <Under></Under>
            
            <div className="error-message">
                <h2>Error</h2>
                <p>You are not authorized to access this resource.</p>
            </div>
            
            <Footer></Footer>
        </div>
    )
}

export default Error;