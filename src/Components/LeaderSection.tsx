import * as React from 'react';
import '../Stylesheets/LeaderSection.scss';

interface MyProps {
    title: string,
    list: Array<any>,
    category: string
}

interface MyState {
    cats: Array<string>
}

class LeaderSection extends React.Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props);
        this.state = {
            cats: ["goals", "assists", "points"]
        }
    }

    render() {
        return(
            <div className="leader-section">
                <div className="leader-title">{this.props.title}</div>
                {this.state.cats.includes(this.props.category) && 
                    <div className="leader-list">
                        { this.props.list.map((player: any, x: any) => {
                            return(
                                <div className="listing" id={x === 4? "divider" : ""}>
                                    <div className="name" id={x<5? "large-name": "small-name"}>
                                        {player.playerName}
                                    </div>
                                    <div className="number" id={x<5? "large-stat": "small-stat"}>
                                        {player[this.props.category]}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                } 
                {this.state.cats.includes(this.props.category) === false &&
                    <div className="leader-list">
                        { this.props.list.map((player: any, x: any) => {
                            return(
                                <div className="listing" id={x === 4? "divider" : ""}>
                                    <div className="name" id={x<5? "large-name": "small-name"}>
                                        {player.playerName}
                                    </div>
                                    <div className="number" id={x<5? "large-stat": "small-stat"}>
                                        {player[this.props.category].toFixed(2)}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        );
    }
}

export default LeaderSection;