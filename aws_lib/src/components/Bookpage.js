import Footer from './footer'
import Navbar from './navbar'
import BookList from "./Booklist"

function Bookpage(){
    return(
        <div>
            <Navbar></Navbar>
            <BookList></BookList>
            <Footer></Footer>
        </div>
    )
}

export default Bookpage;