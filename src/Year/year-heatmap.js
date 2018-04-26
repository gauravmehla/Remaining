import React, { Component } from 'react';

import CalendarHeatmap from 'react-calendar-heatmap';
import moment from 'moment';

import './year-heatmap.css';

export default class YearHeatmap extends Component {
	yearStart 	= moment().startOf('year');
	yearEnd 	= moment().endOf('year')

	constructor(props, context) {
	    super(props, context);

	  	this.state = {
	      	numDays : 365,
	      	values: this.getDummyDates(moment().startOf('year'), new Date()),
	      	timeLeft : moment( moment().endOf('year') ).dayOfYear() - moment().dayOfYear(),
	      	convertToPercentage : localStorage.getItem('ctp-y') === "true" ? true : false
	    } 
 	}

 	getDummyDates = function(startDate, endDate) {
	    var dates = [];
	    var currDate = moment(startDate).startOf('day');
	    var lastDate = moment(endDate).startOf('day');
	    while(currDate.add(1, 'days').diff(lastDate) < 0) {
	        dates.push({ "date" : currDate.clone().format('YYYY-MM-DD'), "value" : 3 });
	    }
	    return dates;
	}

 	componentDidMount() {
 		let intervalId = setInterval(function(){
 			this.update();
		}.bind(this),50)
		this.setState({intervalId: intervalId});
 	}

 	update() {
 		if( this.state.convertToPercentage ) {
			let now = moment();
			const duration = moment.duration(now.diff(this.yearStart)).asMilliseconds();
		    const total = moment.duration(this.yearEnd.diff(this.yearStart)).asMilliseconds();
		    const percent = 100 - ( duration * 100 / total );
		    this.setState( { timeLeft : percent.toFixed(10) })
		} else {
			this.setState( { timeLeft : moment( moment().endOf('year') ).dayOfYear() - moment().dayOfYear() })
		}
		this.setState( { values : this.getDummyDates(moment().startOf('year'), new Date()) })
 	}

 	updateView() {
 		localStorage.setItem('ctp-y', !this.state.convertToPercentage );
 		this.setState( { 'convertToPercentage' : !this.state.convertToPercentage })
 		this.update()
 	}

 	componentWillUnmount(){
	   // use intervalId from the state to clear the interval
	   clearInterval(this.state.intervalId);
	}

	render() {
		return (
			<div className="react-calendar-heatmap">
				<header className="App-header">
			        <span onClick={ this.updateView.bind(this) } >{ this.state.timeLeft }{ this.state.convertToPercentage? '%' : this.state.timeLeft > 1 ? ' days' : ' day' } left...</span>
		        </header>
				<CalendarHeatmap
	      			startDate={ this.yearStart }
	        		endDate={ this.yearEnd }
	        		// numDays={this.state.numDays}
	        		values={this.state.values}
	        		classForValue={( day ) => {
					    if (!day) {
					      return 'color-empty';
					    }
					    return `yearColor`;
					}}
	      		/>
      		</div>
		);
	}
}
