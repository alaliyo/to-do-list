import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { authService } from './firebase';
import AppRouter from './components/Router';
import Footer from './components/Footer';
import Navigator from './components/Navigator';
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
        setLoggedIn(true);
      }
      setInit(true);
    })
  }, []);

  return (
    <div>
      { init && <Navigator loggedIn={loggedIn} userObj={userObj} /> }
      { init ? <AppRouter userObj={userObj} loggedIn={loggedIn}></AppRouter> : 
        <LodingBox><Spinner animation="border" variant="secondary" /></LodingBox> }
      { init && <Footer /> }
    </div>
  )
}

export default App;

const LodingBox = styled.div`
  margin: auto;
  width: 200px;
  padding-top: 20vh;
  height: 100vh;
`