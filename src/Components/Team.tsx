import * as React from 'react';
import '../Stylesheets/Team.scss';

interface MyState {
    year: string,
    yearOptions: Array<string>,
    showChoices: boolean
}

class Team extends React.Component<{}, MyState> {

    constructor(props: any){
        super(props);
        this.state = {
            year: '2018-19',
            yearOptions: ['2018-19', '2017-18', '2016-17'],
            showChoices: false
        };
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

    render() {
        return(
            <div id="team-wrap">
                <div id="year-wrap" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                    <div id="change-year">{this.state.year}</div>
                    {this.state.showChoices && 
                        <div id="year-choices">
                            {this.state.yearOptions.map((yr, x) => {
                                return (
                                    <div id="other-year" key={x}>{yr}</div>
                                )
                            })}
                        </div>
                    }
                </div>
                <div id="overview-wrap">
                    <table>
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
                            <td>46</td>
                            <td>28</td>
                            <td>8</td>
                            <td>100</td>
                            <td>46</td>
                            <td>286</td>
                            <td>251</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default Team;