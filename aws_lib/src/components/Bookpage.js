import Footer from './footer'
import Navbar from './navbar'
import BookList from "./Booklist"
import Under from './under';

function Bookpage(){
    return(
        <div>
            <Navbar page="/dashboard"></Navbar>
            <Under></Under>
            <BookList></BookList>
            <Footer></Footer>
        </div>
    )
}

export default Bookpage;