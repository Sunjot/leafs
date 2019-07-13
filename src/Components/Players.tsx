import * as React from 'react';
import Year from './Year';
import '../Stylesheets/Players.scss';
import { start } from 'repl';

interface MyState {
    year: string,
    yearOptions: Array<string>,
    players: Array<any>,
    filter: string,
    filtered: Array<any>
}

class Players extends React.Component<{}, MyState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            year: undefined,
            yearOptions: [],
            players: [],
            filter: 'totals',
            filtered: []
        }
    }

    componentDidMount = async () => {
        let [players, years] = await Promise.all([
            fetch('/api/players', { method: 'GET' }),
            fetch('/api/years', { method: 'GET' })
        ]);

        let yearList: Array<any> = await years.json();
        let playersList: Array<any> = await players.json();
        let currentYear: string = yearList[yearList.length - 1];

        this.setState({
            players: playersList,
            yearOptions: yearList,
            year: currentYear,
            filtered: this.filterArray(playersList, currentYear.replace("-", ""))
        });
    }

    filterArray = (players: Array<any>, year: string) => {
        let filtered: Array<any> = players.filter(player => {
            let exist: boolean = false;
            player.stats.map((stat: any) => {
                if (stat.year === year) exist = true;
            });
            return exist
        });
        return filtered;
    }

    sortPlayers = (filtered: Array<any>, category: string) => {
 
        let sorted: Array<any> = [...filtered].sort((a, b) => {
            let aYear = a.stats.find((s:any) => s.year === this.state.year.replace("-", ""));
            let bYear = b.stats.find((s:any) => s.year === this.state.year.replace("-", ""));
            return  bYear[category] - aYear[category];
        });
 
        return sorted;
    }

    changeYear = (e:any) => {
        this.setState({
            year: e.target.innerHTML,
            filtered: this.filterArray(this.state.players, e.target.innerHTML.replace("-", ""))
        });
    }

    setFilter = (e: any) => {
        this.setState({
            filter: e.target.id
        });
    }

    render() {

        let goals, assists, points = [];
        if (this.state.filter === 'totals') {
            goals = this.sortPlayers(this.state.filtered, "goals");
            assists = this.sortPlayers(this.state.filtered, "assists");
            points = this.sortPlayers(this.state.filtered, "points");
        }

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
                        <div className="leader-section">
                           {goals.map((player, x) => {
                               return (
                                <div>{player.name}</div>
                               );
                           })}
                        </div>
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