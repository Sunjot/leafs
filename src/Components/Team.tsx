import * as React from 'react';
import '../Stylesheets/Team.scss';
import { Line } from "react-chartjs-2";

interface MyState {
    year: string,
    yearOptions: Array<string>,
    showChoices: boolean,
    seasonData: Array<Season>,
    currentSeason: Season,
    currentMonthData: Array<number>
}

interface Season {
    current?: boolean,
    year?: string,
    monthData?: Array<number>,
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
            currentSeason: {},
            currentMonthData: []
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
            let monthData: Array<number> = []

            data.map((s: Season) => { 
                if (s.current) {
                    current = s; 
                    monthData = s.monthData;
                }
                yearOptions.push(s.year);
            });
            
            this.setState({
                year: current.year,
                yearOptions: yearOptions,
                seasonData: data,
                currentSeason: current,
                currentMonthData: monthData
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

        if (this.state.year !== e.target.innerHTML) {
            let currentSeason: Season = {};
            let monthData: Array<number> = [];
            
            this.state.seasonData.map((s, i) => {
                if(s.year === e.target.innerHTML) {
                    currentSeason = s;
                    monthData = s.monthData;
                }
            });
            this.setState({
                year: e.target.innerHTML,
                currentSeason: currentSeason,
                currentMonthData: monthData
            });
        }
    }

    render() {
        let chartData = {
            labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'March', 'April'],
            datasets: [{
                label: 'Win %',
                data: this.state.currentMonthData,
                fill: false,
                borderColor: "rgb(23, 102, 130)",
                borderWidth: 2,
                pointBackgroundColor: "rgb(23, 102, 130)"
            }]
        }

        let chartOptions = {
            title: {
                display: true,
                text: 'Win% by Month',
                fontSize: 16,
                fontColor: 'black',
                fontFamily: 'Questrial',
                padding: 15
            },
            legend: {
                display: false
            }
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
                                if (i > 3) // want to leave out _id, year and current boolean
                                    return(
                                        <div key={i} className="stat-box">
                                            <div className="stat-title">{k}</div>
                                            <div className="stat-number">{v}</div>
                                        </div>
                                    );
                            })}
                        </div>
                        <div id="basic-chart">
                            <Line data={chartData} options={chartOptions} width={600} height={250} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Team;