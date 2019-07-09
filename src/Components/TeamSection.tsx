import * as React from 'react';
import { Line } from "react-chartjs-2";
import { Season, Basic, Metrics } from './Interfaces/SeasonInterface';
import '../Stylesheets/TeamSection.scss';
import { ChartI } from './Interfaces/ChartInterface';
import Chart from './Chart';

interface TeamSectionProps extends ChartI {
    currentSeason: Basic | Metrics,
    title: string
}

function TeamSection({currentSeason, title, labels}: TeamSectionProps) {

    return(
        <div id ="team-section">
            <div id="team-section-title">{title}</div>
            <div id="team-section-stats">
                {Object.entries(currentSeason).map(([k, v], i) => {
                    if (i > 0) 
                        return(
                            <div key={i} className="stat-box">
                                <div className="stat-title">{k}</div>
                                <div className="stat-number">{v}</div>
                            </div>
                        );
                })}
            </div>
            <Chart data={currentSeason.data} labels={labels} />
        </div>
    );
}

export default TeamSection;