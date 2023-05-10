// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <navbar>AWS Library</navbar>
//       </header>
//     </div>
//   );
// }

// export default App;
// import ThemeSwitcher from "./ThemeSwitcher";

// function App() {
//   return (
//     <div className="App min-vh-100 d-flex justify-content-center align-items-center">
//       <div>
//         <ThemeSwitcher />
//       </div>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Events from './pages/events';
import AnnualReport from './pages/annual';
import Teams from './pages/team';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route path='/' exact component={Home} />
		<Route path='/about' component={About} />
		<Route path='/events' component={Events} />
		<Route path='/annual' component={AnnualReport} />
		<Route path='/team' component={Teams} />
		<Route path='/blogs' component={Blogs} />
		<Route path='/sign-up' component={SignUp} />
	</Routes>
	</Router>
);
}

export default App;
