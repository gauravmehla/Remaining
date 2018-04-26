import React, { Component } from 'react';
import moment from 'moment';

import './day-heatmap.css';

export default class DayHeatmap extends Component {

	constructor(props, context) {
	    super(props, context);

		this.state = {
			"timeLeft" : 1440 - ( ( +moment().format('HH') * 60 ) + +moment().format('mm') ),
			"convertToPercentage" : localStorage.getItem('ctp-d') === "true" ? true : false,
		}
	}

	componentDidMount() {
 		let intervalId = setInterval(function(){
 			this.update();
		}.bind(this),50);
		this.setState({intervalId: intervalId});
 	}

 	update() {
 		if( this.state.convertToPercentage ) {
			let start = moment().startOf('day');
			let end = moment().endOf('day');
			let now = moment();
			const duration = moment.duration(now.diff(start)).asMilliseconds();
		    const total = moment.duration(end.diff(start)).asMilliseconds();
		    const percent = 100 - ( duration * 100 / total );
		    this.setState( { timeLeft : percent.toFixed(10) })
		} else {
			this.setState( { timeLeft : 1440 - ( ( +moment().format('HH') * 60 ) + +moment().format('mm') )})
		}
 	}

 	updateView() {
 		localStorage.setItem('ctp-d', !this.state.convertToPercentage );
 		this.setState( { 'convertToPercentage' : !this.state.convertToPercentage })
 		this.update()
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
					content.push(<div className={`day done`} key={i}><span>{ i === 0 ? 12 : i > 12 ? i - 12 : i }</span></div>);
				} else {
					content.push(<div className="day" key={i}><span>{ i === 0 ? 12 : i > 12 ? i - 12 : i }</span></div>);
				}
			}
			return content;
		})();

		return (
			<div>
		        <header className="App-header">
		        	<span onClick={ this.updateView.bind(this) }>{ this.state.timeLeft }{ this.state.convertToPercentage ? '%' : this.state.timeLeft > 1 ? ' minutes' : ' minute' } left...</span>
		        </header>
		 		<div className="day-heatmap">
        			{ schedule }
        		</div>
			</div>
		);
	}
}
