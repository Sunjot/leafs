import * as React from 'react';
import '../Stylesheets/Year.scss';

interface MyState {
    showChoices: boolean,
    year: string
}

interface MyProps {
    yearOptions: Array<string>,
    year: string,
    otherYear?: Function
}

class Year extends React.Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)
        this.state = {
            showChoices: false,
            year: undefined
        }
    }

    // didMount vs didUpdate: if the year isn't hardcoded, didMount won't set the year 
    // (it'll be undefined) and so didUpdate takes care of that once the data is finally
    // retrieved from the backend.
    componentDidMount = () => {
        this.setState({
            year: this.props.year
        });
    }

    componentDidUpdate(){
        if (this.state.year !== this.props.year && this.state.year === undefined) {
            this.setState({
                year: this.props.year
            });
        }
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

    updateYear = (e: any) => {
        if (this.state.year !== e.target.innerHTML) {
            this.setState({
                year: e.target.innerHTML
            });

            if (this.props.otherYear) {
                this.props.otherYear(e);
            }
        }
    }

    render() {
        return(
            <div id="year-wrap" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                <div id="change-year">{this.state.year}</div>
                {this.state.showChoices && 
                    <div id="year-choices">
                        {this.props.yearOptions.map((yr, x) => {
                            return (
                                <div id="other-year" onClick={(e) => this.updateYear(e)} key={x}>{yr}</div>
                            )
                        })}
                    </div>
                }
            </div>
        );
    }
}

export default Year;