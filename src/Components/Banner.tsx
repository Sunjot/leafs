import * as React from 'react';
import '../Stylesheets/Banner.scss';
import { Link } from 'react-router-dom';

type MyProps = {
    logoPos: string,
    nav: string
}

class Banner extends React.Component<MyProps, {}> {
    
    render() {
        return(
            <div id={this.props.nav} className="banner-wrap">
                <Link to="/">
                    <img id={this.props.logoPos} src="https://i.imgur.com/Au3iKeh.png" />
                </Link>
            </div>
        );
    }
}

export default Banner;