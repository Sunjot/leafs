import * as React from 'react';
import Year from './Year';
import '../Stylesheets/Players.scss';

interface MyState {
    players: Array<object>
}

class Players extends React.Component<{}, MyState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            players: []
        }
    }

    componentDidMount = async () => {
        let res = await fetch('/api/players', { method: 'GET' });
        this.setState({
            players: await res.json()
        });
    }

    render() {
        return(
            <div id="players-wrap">
                <Year 
                    yearOptions={["2018-19", "2017-18", "2016-17"]}
                    year="2018-19"
                />
                <div id="leaderboard-wrap">
                    <div id="leaderboard-title">Leaderboard</div>
                    <div id="filter">
                        <div className="filter-choice">Totals</div>
                        <div className="filter-choice">Rates</div>
                    </div>
                    <div id="leaders">
                        <div className="leader-section"></div>
                        <div className="leader-section"></div>
                        <div className="leader-section"></div>
                        <div className="leader-section"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Players;