import * as React from 'react';
import '../Stylesheets/Team.scss';

interface MyState {
    year: string,
    yearOptions: Array<string>,
    showChoices: boolean,
    seasonData: Array<Season>,
    currentSeason: Season
}

interface Season {
    current?: boolean,
    year?: string,
    wins?: number,
    losses?: number,
    ot?: number,
    points?: number,
    row?: number,
    gf?: number,
    ga?: number
}

class Team extends React.Component<{}, MyState> {

    constructor(props: any){
        super(props);
        this.state = {
            year: undefined,
            yearOptions: [],
            showChoices: false,
            seasonData: [],
            currentSeason: {}
        };
    }

    componentWillMount = () => {
        fetch('/api/seasons', {
            method: 'GET'
        }).then((data) => {
            return data.json();
        }).then((data) => {

            let current: Season = {};
            let yearOptions: Array<string> = [];
            data.map((s: Season) => { 
                if (s.current) current = s; 
                yearOptions.push(s.year);
            });
            
            this.setState({
                year: current.year,
                yearOptions: yearOptions,
                seasonData: data,
                currentSeason: current
            });
        })
    }

    mouseEnter = () => {
        this.setState({
            showChoices: true
        });
    }

    mouseLeave = () => {
        this.setState({
            showChoices: false
        });
    }

    otherYear = (e: any) => {
        let currentSeason: Season = {};
        this.state.seasonData.map((s, i) => {
            if(s.year === e.target.innerHTML) currentSeason = s;
        });
        this.setState({
            year: e.target.innerHTML,
            currentSeason: currentSeason
        });
    }

    render() {
        return(
            <div id="team-wrap">
                <div id="year-wrap" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                    <div id="change-year">{this.state.year}</div>
                    {this.state.showChoices && 
                        <div id="year-choices">
                            {this.state.yearOptions.map((yr, x) => {
                                return (
                                    <div id="other-year" onClick={this.otherYear} key={x}>{yr}</div>
                                )
                            })}
                        </div>
                    }
                </div>
                <div id="overview-wrap">
                    <table>
                        <tbody>
                            <tr>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>OT</th>
                                <th>Points</th>
                                <th>Row</th>
                                <th>GF</th>
                                <th>GA</th>
                            </tr>
                            <tr>
                                {Object.entries(this.state.currentSeason).map(([k, v], i) => {
                                    if (i > 2) // want to leave out _id, year and current boolean
                                        return(<td>{v}</td>);
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Team;