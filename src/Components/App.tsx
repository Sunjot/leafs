import * as React from 'react';
import '../Stylesheets/App.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <Home/>} />
        </div>
      </Router>
    )
  }
}

export default App;
