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

interface MyProps {
    updateLogoPos: Function,
    onLoad: boolean
}

class Team extends React.Component<MyProps, MyState> {

    constructor(props: MyProps){
        super(props);
        this.state = {
            year: undefined,
            yearOptions: [],
            seasonData: [],
            currentSeason: { general: {}, metrics: {} }
        };
    }

    componentDidMount = () => {
        // only collapse banner if page was loaded through URL; otherwise, 
        // the navigation callback in Home component will take care of it
        setTimeout(() => { //setTimeout is for a smoother look when page loads
            if (this.props.onLoad === true) this.props.updateLogoPos("team");
        }, 1000);

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
        let generalChartData = {dataLabel: "Win%", titleText: "Win%"};
        let metricChartData = {dataLabel: "CF%", titleText: "5v5 CF%"};

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
                <div id="credit">
                    Thank you to <a target="_blank" href="https://www.naturalstattrick.com/">Natural Stat Trick</a> 
                    &nbsp;and <a target="_blank" href="https://www.nhl.com">NHL</a> for the numbers :)</div>
            </div>
        );
    }
}

export default Team;