import './App.css';
//import MyForm from './AddScheme';
//import Form from './addDB'
import { Sidebars } from './components/Sidebars';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route,Switch } from 'react-router-dom';
import Page from "./components/page"
import TestCrude from './components/TestCrude';
import AddEnv from './components/AddEnv/Modal/AddEnv';
import Environement from './pages/Environement/Environement';
import Schema from './pages/Schema/Schema';
import Users from './pages/User/Users';
function App() {
  
return (
  <Fragment>
    <div className='wrapper'>
    <Router>
      <Sidebars/>
      <Routes>
        <Route path="/Environment" element={<Environement/>} />
        <Route path="/Schema" element={<Schema />}/>
        <Route path="/Users" element={<Users />}/>
        <Route path="/test" element={<TestCrude/>}/>
      </Routes>
    </Router>
    
    </div>
    
  </Fragment>
  

)
}

export default App;
