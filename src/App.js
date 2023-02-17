import styled from 'styled-components';
import { useState, useEffect } from 'react';
import AppRouter from './components/Router';
import { authService } from './firebase';

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
      { init ? <AppRouter userObj={userObj} loggedIn={loggedIn}></AppRouter> : <LodingBox><h1>...Loading</h1></LodingBox> }
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