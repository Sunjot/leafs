import * as React from 'react';
import '../Stylesheets/App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import Home from './Home';
import Banner from './Banner';
import Team from './Team';
import Players from './Players';

interface MyState {
  logoPos: string,
  nav: string,
  onLoad: boolean,
  showLinks: boolean,
  route: string
}

class App extends React.Component<RouteComponentProps, MyState> {

  constructor(props: any) {
    super(props);
    this.state = {
      logoPos: 'main-logo',
      nav: 'expand-nav',
      onLoad: true, // animation depends on whether page was loaded through URL or navigation
      showLinks: false,
      route: ""
    }
  }

  updateNavActive = (route: string) => {
    this.setState({
      route: route
    });
  }

  updateLogoPos = (route = "") => {
    if(this.state.logoPos === 'main-logo') {
      this.setState({
        logoPos: 'side-logo',
        nav: 'collapse-nav',
        onLoad: false,
        showLinks: true,
        route: route
      });
    }
    else {
      this.setState({
        logoPos: 'main-logo',
        nav: 'expand-nav',
        onLoad: false,
        showLinks: false,
        route: route
      });
    }
  }

  render() {
    return (
      <div id="app-wrap">
        <Banner 
          logoPos={this.state.logoPos} 
          nav={this.state.nav} 
          showLinks={this.state.showLinks} 
          route={this.state.route}
          updateNavActive={this.updateNavActive}
        />
        <Switch>
            <Route 
              exact path="/" 
              render={() => <Home 
                logoPos={this.state.logoPos} 
                updateLogoPos={this.updateLogoPos} 
              />} 
            />
            <Route 
              exact path="/team" 
              render={() => <Team 
                updateLogoPos={this.updateLogoPos} 
                onLoad={this.state.onLoad} 
              />} 
            />
            <Route 
              exact path="/players" 
              render={() => <Players 
                updateLogoPos={this.updateLogoPos} 
                onLoad={this.state.onLoad} 
              />} 
            />
            {/* <Route render={() => <Redirect to="/" />}/> */}
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
