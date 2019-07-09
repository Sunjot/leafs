import * as React from 'react';
import '../Stylesheets/Team.scss';
import { Line } from "react-chartjs-2";
import TeamSection from './TeamSection';
import Year from './Year';
import { Season } from './Interfaces/SeasonInterface';

interface MyState {
    year: string, // active year
    yearOptions: Array<string>, // list of years to choose from
    seasonData: Array<Season>, // entire object of seasons data
    currentSeason: Season // object of active seasons data
}

class Team extends React.Component<{}, MyState> {

    constructor(props: any){
        super(props);
        this.state = {
            year: undefined,
            yearOptions: [],
            seasonData: [],
            currentSeason: { general: {}, metrics: {} }
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

    otherYear = (e: any) => {

        let currentSeason: Season = {};

        this.state.seasonData.map((s, i) => {
            if (s.year === e.target.innerHTML) currentSeason = s;
        });

        this.setState({
            year: e.target.innerHTML,
            currentSeason: currentSeason
        });
    }

    render() {

        // Passing both down multiple components so combined into a single prop
        let generalChartData = {dataLabel: "Win%", titleText: "Win% by Month"};
        let metricChartData = {dataLabel: "CF%", titleText: "CF% by Month"};

        return(
            <div id="team-wrap">
                <Year 
                    yearOptions={this.state.yearOptions} 
                    year={this.state.year} 
                    otherYear={this.otherYear} 
                />
                <div id="overview-wrap">
                    <TeamSection 
                        title="General" 
                        currentSeason={this.state.currentSeason.general} 
                        labels={generalChartData} 
                    />
                    <div className="divider"></div>
                    <TeamSection 
                        title="Metrics" 
                        currentSeason={this.state.currentSeason.metrics} 
                        labels={metricChartData} 
                    />
                </div>
            </div>
        );
    }
}

export default Team;