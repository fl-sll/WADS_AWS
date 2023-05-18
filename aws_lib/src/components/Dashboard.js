import Footer from './footer'
import Navbar from './navbar'
import BookList from "./Booklist"

function Dashboard(){
    return(
        <div>
            <Navbar></Navbar>
            <BookList></BookList>
            <Footer></Footer>
        </div>
    )
}

export default Dashboard;