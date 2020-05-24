import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Characters from './components/characters';
import Locations from './components/locations';
import Main from './components/main';

function App() {
  return (
    <React.Fragment>
    <Main />
    <Router>
      <Switch>
        <Route path='/characters' component={Characters}/>
        <Route path='/locations' component={Locations} />
      </Switch>
    </Router>
    </React.Fragment>
  );
}

export default App;
