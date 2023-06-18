import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bookpage from './components/Bookpage';
import Login from './components/login'
import Admin from './components/adminLogin';
import Dashboard from './components/Dashboard';
import AdminPage from './components/adminPage';
import AddBook from './components/AddBook';
import CheckOrder from './components/CheckOrder';
import Profile from './components/Profile';
import Error from "./components/Error"
import BookDatabase from './components/BookDB';


function App() {
  return (
    <div className = "app">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />}/>
          <Route exact path='/bookpage' element={<Bookpage />}/>
          <Route exact path='/adminLogin' element={<Admin />}/>
          <Route exact path='/dashboard' element={<Dashboard />}/>
          <Route exact path='/adminPage' element={<AdminPage/>}/>
          <Route exact path='/addBook' element={<AddBook/>}/>
          <Route exact path='/checkOrder' element={<CheckOrder/>}/>
          <Route exact path='/database' element={<BookDatabase/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
          <Route exact path='/error' element={<Error/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
