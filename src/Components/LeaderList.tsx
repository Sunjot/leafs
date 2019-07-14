import * as React from 'react';
import '../Stylesheets/LeaderList.scss';

interface MyProps {
    list: Array<any>
    basic: boolean,
    category: string
}

class LeaderList extends React.Component<MyProps, {}> {

     constructor(props: MyProps) {
         super(props);
     }

    render() {
        return(
            <div className="leader-list">
                { this.props.list.map((player: any, x: any) => {
                    return(
                        <div key={x} className="listing" id={x === 4? "divider" : ""}>
                            <div className="name" id={x<5? "large-name": "small-name"}>
                                {player.playerName}
                            </div>
                            <div className="number" id={x<5? "large-stat": "small-stat"}>
                                {this.props.basic? player[this.props.category] : player[this.props.category].toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default LeaderList;