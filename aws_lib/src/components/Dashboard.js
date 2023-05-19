import Footer from './footer'
import Navbar from './navbar'
import Main from './Main'
// import BookList from "./Booklist"

function Dashboard(){
    return(
        <div>
            <Navbar></Navbar>
            {/* <BookList></BookList> */}
            <Main></Main>
            <Footer></Footer>
        </div>
    )
}

export default Dashboard;