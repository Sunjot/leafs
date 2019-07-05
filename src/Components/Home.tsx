import * as React from 'react';
import '../Stylesheets/Home.scss';
import Banner from './Banner';
import NavItem from './NavItem';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface MyProps extends RouteComponentProps {
  updateLogoPos: Function
}

class Home extends React.Component<MyProps, {}> {

  constructor(props: MyProps){
    super(props);
  }

  navClick = () => {
    this.props.updateLogoPos();
    setTimeout(() => {
        this.props.history.push('/team');
    }, 2000);
  }

  render() {
    return (
      <div id="home-wrap">
        <div id="nav-wrap">
          <NavItem navClick={this.navClick}/>
        </div>
      </div>
    )
  }
}

export default withRouter(Home);
