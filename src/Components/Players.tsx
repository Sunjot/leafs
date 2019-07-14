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
            fetch('/api/players', {
                method: 'POST',
                body: JSON.stringify({ cats: ["goals", "assists", "points"], type: "basic", report: "summary"}),
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

    changeYear = async (e:any) => {
        let year = e.target.innerHTML;
        let [basics, adv] = await Promise.all([
            fetch('/api/players', {
                method: 'POST', 
                body: JSON.stringify({ cats: ["goals", "assists", "points"], type: "basic", report: "summary", year: year}), 
                headers: {"Content-Type": "application/json"}
            }),
            fetch('/api/players', {
                method: 'POST', 
                body: JSON.stringify({ cats: ["goalsPer60Minutes", "assistsPer60Minutes", "pointsPer60Minutes"], type: "core", report: "scoring", year: year}), 
                headers: {"Content-Type": "application/json"}
            })
        ]);

        this.setState({
            year: year,
            basics: await basics.json(),
            adv: await adv.json()
        }, () => {
            console.log(this.state.basics);
        });

    }

    setFilter = async (e: any) => {
        let id = e.target.id;

        this.setState({
            filter: id
        });

        if (this.state.adv[0].data.length === 0 && id === "rates") {
            let results = await fetch('/api/players', {
                method: 'POST',
                body: JSON.stringify({ cats: ["goalsPer60Minutes", "assistsPer60Minutes", "pointsPer60Minutes"], type: "core", report: "scoring"}),
                headers: {"Content-Type": "application/json"}
            });
            this.setState({
                adv: await results.json()
            });
        }
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
                    {this.state.filter === 'totals' &&
                        <div id="leaders">
                            <LeaderSection title="Goals" list={this.state.basics[0].data} category="goals" />
                            <LeaderSection title="Assists" list={this.state.basics[1].data} category="assists" />
                            <LeaderSection title="Points" list={this.state.basics[2].data} category="points" />
                        </div>
                    }
                    {this.state.filter === 'rates' &&
                        <div id="leaders">
                            <LeaderSection title="Goals/60" list={this.state.adv[0].data} category="goalsPer60Minutes" />
                            <LeaderSection title="Assists/60" list={this.state.adv[1].data} category="assistsPer60Minutes" />
                            <LeaderSection title="Points/60" list={this.state.adv[2].data} category="pointsPer60Minutes" />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Players;