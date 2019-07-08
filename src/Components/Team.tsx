import * as React from 'react';
import '../Stylesheets/Team.scss';
import { Line } from "react-chartjs-2";
import TeamSection from './TeamSection';
import Year from './Year';
import { Season } from './Interfaces/SeasonInterface';

interface MyState {
    year: string,
    yearOptions: Array<string>,
    seasonData: Array<Season>,
    currentSeason: Season,
    currentMonthData: Array<number>
}

class Team extends React.Component<{}, MyState> {

    constructor(props: any){
        super(props);
        this.state = {
            year: undefined,
            yearOptions: [],
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

    otherYear = (e: any) => {

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
                <Year yearOptions={this.state.yearOptions} year={this.state.year} otherYear={this.otherYear} />
                <div id="overview-wrap">
                    <TeamSection currentSeason={this.state.currentSeason} chartData={chartData} chartOptions={chartOptions} />
                </div>
            </div>
        );
    }
}

export default Team;