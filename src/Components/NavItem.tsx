import * as React from 'react';
import '../Stylesheets/NavItem.scss';

interface NavProps {
    navClick: Function,
    content: any
}

function NavItem({navClick, content}: NavProps) {
    
    return(
        <div onClick={() => navClick()} id={content.title} className="navitem-wrap">
            <div className="title-text">{content.title}</div>
            <img className="navimage" src={content.image}/>
        </div>
    );

    /*return(
        <div onClick={() => navClick()} id="navitem-wrap">
            <img id="navimage" src={content.image}/>
            <div id="info-wrap">
                <div id="title">{content.title}</div>
                <div id="desc">{content.desc}</div>
            </div>
        </div>
    )*/
}

export default NavItem;