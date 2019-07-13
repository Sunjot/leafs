import * as React from 'react';
import Year from './Year';
import '../Stylesheets/Players.scss';
import LeaderSection from './LeaderSection';

interface MyState {
    year: string,
    yearOptions: Array<string>,
    filter: string,
    basics: Array<any>,
    adv: Array<any>
}

class Players extends React.Component<{}, MyState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            year: undefined,
            yearOptions: [],
            filter: 'totals',
            basics: [{ data: [] }, { data: [] }, { data: [] }],
            adv: [{ data: [] }, { data: [] }, { data: [] }]
        }
    }

    componentDidMount = async () => {
        let [basics, years] = await Promise.all([
            fetch('/api/basics', {
                method: 'POST',
                body: JSON.stringify({year: "20182019"}),
                headers: {"Content-Type": "application/json"}
            }),
            fetch('/api/years')
        ]);

        let basicsList = await basics.json();
        let yearList = await years.json();
        this.setState({
            yearOptions: yearList,
            year: yearList[yearList.length - 1],
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