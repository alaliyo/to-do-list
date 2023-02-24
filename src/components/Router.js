import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ToDoList from '../pages/ToDoList';
import LogIn from '../pages/LogIn';
import Update from '../pages/Update';

function AppRouter({ loggedIn, userObj}) {

  return <Router>
    <Switch>
      <Route path="/update" >
        <Update userObj={userObj} loggedIn={loggedIn} />
      </Route>
      <Route path="/login" >
        <LogIn loggedIn={loggedIn}/>
      </Route>
      <Route path="/" >
        <ToDoList userObj={userObj} loggedIn={loggedIn} />
      </Route>
    </Switch>
  </Router>;
}

export default AppRouter;