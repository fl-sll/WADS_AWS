import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/login'
import Admin from './components/adminLogin';


function App() {
  return (
    <div className = "app">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />}/>
          <Route exact path='/dashboard' element={<Dashboard />}/>
          <Route exact path='/adminLogin' element={<Admin />}/>
        </Routes>
      </Router>
      {/* <Login></Login> */}
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
