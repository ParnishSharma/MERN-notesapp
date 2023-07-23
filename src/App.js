import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Notestate from './context/notes/Notestate';
import Alert from './components/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  return (
    <>
      <Notestate>
        <Navbar />
        <Alert message="Welcome to NOTES app"/>
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Notestate>
    </>
  );
}

export default App;
