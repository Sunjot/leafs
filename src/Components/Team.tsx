import * as React from 'react';
import '../Stylesheets/Team.scss';
var LineChart = require("react-chartjs").Line;

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
        let chartData = {
            labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'March', 'April'],
            datasets: [{
                label: 'Wins',
                data: [8, 10, 8, 4, 9, 6, 1],
                fillColor: "rgba(0, 0, 0, 0)"
            }]
        }

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
                    <div id ="basics">
                        <div id="basic-stats">
                            {Object.entries(this.state.currentSeason).map(([k, v], i) => {
                                if (i > 2) // want to leave out _id, year and current boolean
                                    return(
                                        <div key={i} className="stat-box">
                                            <div className="stat-title">{k}</div>
                                            <div className="stat-number">{v}</div>
                                        </div>
                                    );
                            })}
                        </div>
                        <LineChart data={chartData} width="600" height="250"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Team;