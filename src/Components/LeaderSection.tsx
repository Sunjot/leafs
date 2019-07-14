import * as React from 'react';
import '../Stylesheets/LeaderSection.scss';
import LeaderList from './LeaderList';

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
                <div className="leader-divider"></div>
                {this.state.cats.includes(this.props.category) && 
                    <LeaderList list={this.props.list} basic={true} category={this.props.category} />
                } 
                {this.state.cats.includes(this.props.category) === false &&
                    <LeaderList list={this.props.list} basic={false} category={this.props.category} />
                }
            </div>
        );
    }
}

export default LeaderSection;