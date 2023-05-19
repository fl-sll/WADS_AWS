import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bookpage from './components/Bookpage';
import Login from './components/login'
import Admin from './components/adminLogin';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <div className = "app">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />}/>
          <Route exact path='/bookpage' element={<Bookpage />}/>
          <Route exact path='/adminLogin' element={<Admin />}/>
          <Route exact path='/dashboard' element={<Dashboard />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
