import * as React from 'react';
import '../Stylesheets/Home.scss';
import Banner from './Banner';
import NavItem from './NavItem';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface MyProps extends RouteComponentProps {
  logoPos: string,
  updateLogoPos: Function
}

interface MyState {
  fade: string
}

interface Content {
  title: string,
  image: string,
  desc: string
}

class Home extends React.Component<MyProps, MyState> {

  constructor(props: MyProps){
    super(props);
    this.state = {
      fade: 'fadeinhome'
    }
  }

  navClick = () => {
    this.props.updateLogoPos();
    this.setState({
      fade: 'fadeouthome'
    });
    setTimeout(() => {
        this.props.history.push('/team');
    }, 1500);
  }

  componentWillMount() { // handles previous page button to expand nav/logo
    if (this.props.logoPos === 'side-logo') {
      this.props.updateLogoPos();
    }
  }

  render() {
    let teamContent: Content = {
      title: "Team", 
      image: "https://i.imgur.com/BdeCpSR.png",
      desc: "Up-to-date game logs."
    };

    let playerContent: Content = {
      title: "Players", 
      image: "https://i.imgur.com/fnZup1y.png",
      desc: "General information + individual stats."
    };

    let scheduleContent: Content = {
      title: "Schedule", 
      image: "https://i.imgur.com/7tvVsyr.png",
      desc: "Calendar and next-game info."
    };

    return (
      <div id="home-wrap" className={this.state.fade}>
        <div id="nav-wrap">
          <NavItem navClick={this.navClick} content={teamContent} />
          <NavItem navClick={this.navClick} content={playerContent} />
          <NavItem navClick={this.navClick} content={scheduleContent} />
        </div>
      </div>
    )
  }
}

export default withRouter(Home);
