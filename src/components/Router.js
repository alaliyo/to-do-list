import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ToDoList from '../pages/ToDoList';
import LogIn from '../pages/LogIn'

function AppRouter({ loggedIn, userObj}) {

  return <Router>
    <Switch>
      <Route path={`${process.env.PUBLIC_URL}/login`}>
        <LogIn loggedIn={loggedIn}/>
      </Route>
      <Route path={`${process.env.PUBLIC_URL}/`}>
        <ToDoList userObj={userObj} loggedIn={loggedIn} />
      </Route>
    </Switch>
  </Router>;
}

export default AppRouter;