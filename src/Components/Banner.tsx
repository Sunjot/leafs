import * as React from 'react';
import '../Stylesheets/Banner.scss';

type BannerProps = {
    logoPos: string,
    nav: string
}

function Banner({logoPos, nav}: BannerProps) {
    return (
        <div id={nav} className="banner-wrap">
            <img id={logoPos} src="https://i.imgur.com/Au3iKeh.png" />
        </div>
    );
}

export default Banner;