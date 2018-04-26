import React, { Component } from 'react';

import moment from 'moment';

import './month-heatmap.css';

export default class MonthHeatmap extends Component {

	constructor(props, context) {
	    super(props, context);

		this.state = {
			timeLeft : moment().daysInMonth() - moment().date(),
			convertToPercentage : localStorage.getItem('ctp-m') === "true" ? true : false,
		}
	}

	componentDidMount() {
 		let intervalId = setInterval(function(){
 			this.update();
		}.bind(this), 50)
		this.setState({intervalId: intervalId});
 	}

 	update() {
 		if( this.state.convertToPercentage ) {
	 		let start = moment().startOf('month');
			let end = moment().endOf('month');
			let now = moment();
			const duration = moment.duration(now.diff(start)).asMilliseconds();
		    const total = moment.duration(end.diff(start)).asMilliseconds();
		    const percent = 100 - ( duration * 100 / total );
		    this.setState( { timeLeft : percent.toFixed(10) })
		} else {
			this.setState( { timeLeft : moment().daysInMonth() - moment().date() })
		}
 	}

 	updateView() {
 		localStorage.setItem('ctp-m', !this.state.convertToPercentage );
 		this.setState( { 'convertToPercentage' : !this.state.convertToPercentage })
 		this.update()
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
					content.push(<div className={`month done`} key={i}><span>{i}</span></div>);
				} else {
					content.push(<div className="month" key={i}><span>{i}</span></div>);
				}
			}
			return content;
		})();

		return (
			<div>
		        <header className="App-header">
		        	<span onClick={ this.updateView.bind(this) }>{ this.state.timeLeft }{ this.state.convertToPercentage ? '%' : this.state.timeLeft > 1 ? ' days' : ' day' } left...</span>
		        </header>
		 		<div className="month-heatmap">
        			{ schedule }
        		</div>
			</div>
		);
	}
}
