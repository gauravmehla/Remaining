import React, { Component } from 'react';

import moment from 'moment';
import './week-heatmap.css';

export default class WeekHeatmap extends Component {

	constructor(props, context) {
	    super(props, context);

		this.state = {
			"daysLeft" : 7 - moment().weekday()	
		}
		
	}

	componentDidMount() {
 		let intervalId = setInterval(function(){
			this.setState( { daysLeft : 7 - moment().weekday() })
		}.bind(this),1000)
		this.setState({intervalId: intervalId});
 	}

	componentWillUnmount(){
	   // use intervalId from the state to clear the interval
	   clearInterval(this.state.intervalId);
	}

	render() {
		let weekday = moment().weekday();
		let weekInitials = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

		let schedule = (function() {
			let content = [];
			for(let i=1; i <= 7; i++){
				if( i <= weekday ) {
					content.push(<div className={`weekday done-3`} key={i}><span>{weekInitials[i-1]}</span></div>);
				} else {
					content.push(<div className="weekday" key={i}><span>{weekInitials[i-1]}</span></div>);
				}
			}
			return content;
		})();

		return (
			<div>
		        <header className="App-header">
		        	{ this.state.daysLeft } { this.state.daysLeft > 1 ? 'days' : 'day' } left...
		        </header>
		 		<div className="week-heatmap">
        			{ schedule }
        		</div>
			</div>
		);
	}
}
