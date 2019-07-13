import * as React from 'react';

interface MyProps {
    title: string,
    list: Array<any>,
    category: string
}

class LeaderSection extends React.Component<MyProps, {}> {

    constructor(props: MyProps) {
        super(props);
    }

    render() {
        return(
            <div className="leader-section">
                <div className="leader-title">{this.props.title}</div>
                <div className="leader-list">
                    {this.props.list.map((player: any, x: any) => {
                        return (
                            <div key={x} className="leader">
                                {player[this.props.category]} - {player.playerName}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default LeaderSection;