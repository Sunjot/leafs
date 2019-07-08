import * as React from 'react';
import { Line } from "react-chartjs-2";
import { Season } from './Interfaces/SeasonInterface';

interface TeamSectionProps {
    currentSeason: Season,
    chartData: any,
    chartOptions: any
}

function TeamSection({currentSeason, chartData, chartOptions}: TeamSectionProps) {

    return(
        <div id ="team-section">
            <div id="team-section-title">General</div>
            <div id="team-section-stats">
                {Object.entries(currentSeason).map(([k, v], i) => {
                    if (i > 3) // want to leave out _id, year and current boolean
                        return(
                            <div key={i} className="stat-box">
                                <div className="stat-title">{k}</div>
                                <div className="stat-number">{v}</div>
                            </div>
                        );
                })}
            </div>
            <div id="team-section-chart">
                <Line data={chartData} options={chartOptions} width={600} height={250} />
            </div>
        </div>
    );
}

export default TeamSection;