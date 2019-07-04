import * as React from 'react';
import '../Stylesheets/Home.scss';
import Banner from './Banner';

class Home extends React.Component {

  render() {
    return (
      <div id="home-wrap">
        <Banner/>
      </div>
    )
  }
}

export default Home;
