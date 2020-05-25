import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Characters from './components/characters';
import Locations from './components/locations';
import Navbar from './components/navbar';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path='/characters' component={Characters}/>
        <Route path='/locations' component={Locations} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
