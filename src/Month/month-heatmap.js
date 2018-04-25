import React, { Component } from 'react';

import moment from 'moment';

import './month-heatmap.css';

export default class MonthHeatmap extends Component {

	constructor(props, context) {
	    super(props, context);

		this.state = {
			"daysLeft" : moment().daysInMonth() - moment().date()
		}
	}

	componentDidMount() {
 		let intervalId = setInterval(function(){
			this.setState( { daysLeft : moment().daysInMonth() - moment().date() })
		}.bind(this),1000)
		this.setState({intervalId: intervalId});
 	}

	componentWillUnmount(){
	   // use intervalId from the state to clear the interval
	   clearInterval(this.state.intervalId);
	}

	render() {
		let schedule = (function() {
			let content = [];
			for(let i=1; i <= moment().daysInMonth(); i++){
				if( i <= moment().date()) {
					content.push(<div className={`month done-3`} key={i}></div>);
				} else {
					content.push(<div className="month" key={i}></div>);
				}
			}
			return content;
		})();

		return (
			<div>
		        <header className="App-header">
		        	{ this.state.daysLeft } { this.state.daysLeft > 1 ? 'days' : 'day' } left...
		        </header>
		 		<div className="month-heatmap">
        			{ schedule }
        		</div>
			</div>
		);
	}
}
