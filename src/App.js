import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Footer from './components/Footer';
import './components/styles.css'


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
      }, 2000);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert alert={alert} />
          <div className='m-0 p-0 w-100vw' style={{ overflowX:'hidden'}}>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />}/>
              {/* <Route exact path="/" element={<About />}/> */}
              <Route exact path="/notewhril" element={<Home showAlert={showAlert} />}/>
              {/* <Route exact path="/notewhril" element={<About />}/> */}
              <Route exact path="/home" element={<Home showAlert={showAlert} />}/>
              <Route exact path="/about" element={<About />}/>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}/>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />}/>
            </Routes>            
            <Footer />
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
