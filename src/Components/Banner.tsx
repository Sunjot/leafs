import * as React from 'react';
import '../Stylesheets/Banner.scss';
import { Link } from 'react-router-dom';

interface MyProps {
    logoPos: string,
    nav: string,
    showLinks: boolean,
    route: string,
    updateNavActive: Function
}

class Banner extends React.Component<MyProps, {}> {

    constructor(props: MyProps) {
        super(props);
    }
    
    render() {
        return(
            <div id={this.props.nav} className="banner-wrap">
                <Link to="/">
                    <img id={this.props.logoPos} src="https://i.imgur.com/Au3iKeh.png" />
                </Link>
                {this.props.showLinks && 
                    <div id="nav-links">
                        <Link to="/team" onClick={() => this.props.updateNavActive("team")} className={this.props.route === "team"? "nav active" : "nav"}>Team</Link>
                        <Link to="/players" onClick={() => this.props.updateNavActive("players")} className={this.props.route === "players"? "nav active" : "nav"}>Players</Link>
                        {/* <Link to="/schedule" onClick={() => this.props.updateNavActive("schedule")} className={this.props.route === "schedule"? "nav active" : "nav"}>Schedule</Link> */}
                    </div>
                }
            </div>
        );
    }
}

export default Banner;