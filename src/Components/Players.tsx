import * as React from 'react';
import Year from './Year';
import '../Stylesheets/Players.scss';

class Players extends React.Component {


    render() {
        return(
            <div id="players-wrap">
                Players
                <Year 
                    yearOptions={["2018-19", "2017-18", "2016-17"]}
                    year="2018-19"
                />
            </div>
        )
    }
}

export default Players;