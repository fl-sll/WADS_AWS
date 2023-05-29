import Footer from './footer'
import Navbar from './navbar'
import Main from './Main'
import Under from './under';
// import BookList from "./Booklist"

function Dashboard(){
    return(
        <div>
            <Navbar></Navbar>
            <Under></Under>
            {/* <BookList></BookList> */}
            <Main></Main>
            <Footer></Footer>
        </div>
    )
}

export default Dashboard;