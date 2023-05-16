import './App.css';
import Navbar from "./components/navbar"
import BookList from "./components/Booklist"
import Footer from './components/footer';

function App() {
  return (
    <div className = "app">
      <div className = "navbar">
        <Navbar></Navbar>
      </div>
      <div className='page-container'>
        <BookList></BookList>
        {/* <Footer></Footer> */}
      </div>
      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
