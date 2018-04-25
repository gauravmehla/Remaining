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
	      	values: this.getDummyDates(moment().startOf('year'), new Date())
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
 		let intervalId =setInterval(function(){
			this.setState( { values : this.getDummyDates(moment().startOf('year'), new Date()) })
		}.bind(this),1000)
		this.setState({intervalId: intervalId});
 	}

 	componentWillUnmount(){
	   // use intervalId from the state to clear the interval
	   clearInterval(this.state.intervalId);
	}

	render() {

		let daysLeft = moment( moment().endOf('year') ).dayOfYear() - moment().dayOfYear();

		return (
			<div className="react-calendar-heatmap">
				<header className="App-header">
			        { daysLeft } { daysLeft > 1 ? 'days' : 'day' } left...
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
					    return `color-github-${day.value}`;
					}}
	      		/>
      		</div>
		);
	}
}
