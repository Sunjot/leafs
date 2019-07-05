import * as React from 'react';
import '../Stylesheets/App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Banner from './Banner';
import Team from './Team';

interface MyState {
  logoPos: string,
  nav: string
}

class App extends React.Component<any, MyState> {

  constructor(props: any) {
    super(props);
    this.state = {
      logoPos: 'main-logo',
      nav: 'expand-nav'
    }
  }

  updateLogoPos = () => {
    this.setState({
      logoPos: 'side-logo',
      nav: 'collapse-nav'
    });
  }

  render() {
    return (
      <Switch>
        <div id="app-wrap">
          <Banner logoPos={this.state.logoPos} nav={this.state.nav} />
          <Route exact path="/" render={() => <Home updateLogoPos={this.updateLogoPos} />} />
          <Route exact path="/team" render={() => <Team/>} />
          <Route render={() => <Redirect to="/" />}/>
        </div>
      </Switch>
    )
  }
}

export default App;
