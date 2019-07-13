import * as React from 'react';
import Year from './Year';
import '../Stylesheets/Players.scss';
import LeaderSection from './LeaderSection';

interface MyState {
    year: string,
    yearOptions: Array<string>,
    filter: string,
    basics: any
}

class Players extends React.Component<{}, MyState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            year: undefined,
            yearOptions: [],
            filter: 'totals',
            basics: [{ data: [] }, { data: [] }, { data: [] }]
        }
    }

    componentDidMount = async () => {
        let basics = await fetch('/api/basics', {
            method: 'POST',
            body: JSON.stringify({year: "20182019"}),
            headers: {"Content-Type": "application/json"}
        });

        let basicsList = await basics.json();
        this.setState({
            basics: basicsList
        });
    }

    changeYear = (e:any) => {
        this.setState({
            year: e.target.innerHTML
        });
    }

    setFilter = (e: any) => {
        this.setState({
            filter: e.target.id
        });
    }

    render() {

        return(
            <div id="players-wrap">
                <Year 
                    yearOptions={this.state.yearOptions}
                    year={this.state.year}
                    otherYear={this.changeYear}
                />
                <div id="leaderboard-wrap">
                    <div id="leaderboard-title">Leaderboard</div>
                    <div id="filter">
                        <div onClick={(e) => this.setFilter(e)} id="totals" className="filter-choice">Totals</div>
                        <div onClick={(e) => this.setFilter(e)} id="rates" className="filter-choice">Rates</div>
                    </div>
                    <div id="leaders">
                        <LeaderSection title="Goals" list={this.state.basics[0].data} category="goals" />
                        <LeaderSection title="Assists" list={this.state.basics[1].data} category="assists" />
                        <LeaderSection title="Points" list={this.state.basics[2].data} category="points" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Players;