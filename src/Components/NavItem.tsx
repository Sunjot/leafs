import * as React from 'react';

type NavProps = {
    navClick: Function
}

function NavItem({navClick}: NavProps) {
    
    return(
        <div onClick={() => navClick()}>Nav Item</div>
    )
}

export default NavItem;