import Footer from './footer'
import Navbar from './navbar'
import Under from './under';
import UserBook from './UserBook';

function Profile(){
    return(
        <div>
            <Navbar page="/dashboard"></Navbar>
            <Under></Under>
            <UserBook></UserBook>
            <Footer></Footer>
        </div>
    )
}

export default Profile;