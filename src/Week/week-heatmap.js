import React, { Component } from 'react';

import moment from 'moment';
import './week-heatmap.css';

export default class WeekHeatmap extends Component {

	constructor(props, context) {
	    super(props, context);

		this.state = {
			"timeLeft" : 7 - moment().weekday(),
			"convertToPercentage" : localStorage.getItem('ctp-w') === "true" ? true : false
		}
		
	}

	componentDidMount() {
 		let intervalId = setInterval(function(){
 				this.update();
		}.bind(this),50)
		this.setState({intervalId: intervalId});
 	}

 	update() {
 		if( this.state.convertToPercentage ) {
			let start = moment().startOf('week').add(1,'day');
			let end = moment().endOf('week').add(1,'day');
			let now = moment();
			const duration = moment.duration(now.diff(start)).asMilliseconds();
		    const total = moment.duration(end.diff(start)).asMilliseconds();
		    const percent = 100 - ( duration * 100 / total );
		    this.setState( { timeLeft : percent.toFixed(10) })
		} else {
			this.setState( { timeLeft : 7 - moment().weekday() })
		}
 	}

 	updateView() {
 		localStorage.setItem('ctp-w', !this.state.convertToPercentage );
 		this.setState( { 'convertToPercentage' : !this.state.convertToPercentage })
 		this.update()
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
		        	<span onClick={ this.updateView.bind(this) }>{ this.state.timeLeft }{ this.state.convertToPercentage ? '%' : this.state.timeLeft > 1 ? ' days' : ' day' } left...</span>
		        </header>
		 		<div className="week-heatmap">
        			{ schedule }
        		</div>
			</div>
		);
	}
}
