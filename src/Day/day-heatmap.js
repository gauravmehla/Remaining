import React, { Component } from 'react';
import moment from 'moment';

import './day-heatmap.css';

export default class DayHeatmap extends Component {

	constructor(props, context) {
	    super(props, context);

		this.state = {
			"timeLeft" : 1440 - ( +moment().format('HH') * 60 ) + +moment().format('mm'),
			"convertToPercentage" : true
		}
	}

	componentDidMount() {
 		let intervalId = setInterval(function(){
 			if( this.state.convertToPercentage ) {
 				let start = moment().set({hour:0,minute:0,second:0,millisecond:0});
				let end = moment().set({hour:23,minute:59,second:59,millisecond:999});
				let now = moment();
				const duration = moment.duration(now.diff(start)).asMilliseconds();
			    const total = moment.duration(end.diff(start)).asMilliseconds();
			    const percent = 100 - ( duration * 100 / total );
			    this.setState( { timeLeft : percent.toFixed(10) })
 			} else {
 				this.setState( { timeLeft : 1440 - ( +moment().format('HH') * 60 ) + +moment().format('mm') })
 			}
		}.bind(this),50);
		this.setState({intervalId: intervalId});
 	}

	componentWillUnmount(){
	   // use intervalId from the state to clear the interval
	   clearInterval(this.state.intervalId);
	}

	render() {
		let currentHour = moment().hour();
		let schedule = (function() {
			let content = [];
			for(let i=0; i <= 24; i++){
				if( i <= currentHour ) {
					content.push(<div className={`day done-3`} key={i}></div>);
				} else {
					content.push(<div className="day" key={i}></div>);
				}
			}
			return content;
		})();

		return (
			<div>
		        <header className="App-header">
		        	<span onClick={() => { this.setState( { 'convertToPercentage' : !this.state.convertToPercentage }) }}>{ this.state.timeLeft }{ this.state.convertToPercentage ? '%' : this.state.timeLeft > 1 ? ' minutes' : ' minute' } left...</span>
		        </header>
		 		<div className="day-heatmap">
        			{ schedule }
        		</div>
			</div>
		);
	}
}
