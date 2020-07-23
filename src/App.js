import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Profile from './components/profile';
import Characters from './components/characters';
import Locations from './components/locations';
import Navbar from './components/navbar';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path='/characters' exact render={() => <Characters />} />
        <Route path='/character/:id' render={() => <Profile />} />
        <Route path='/locations' render={() => <Locations />} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
