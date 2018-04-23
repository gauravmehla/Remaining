import React, { Component } from 'react';
import './App.css';

import CalendarHeatmap from 'react-calendar-heatmap';
import moment from 'moment';

class App extends Component {

	yearStart = moment().startOf('year');
	yearEnd = moment().endOf('year')

  	constructor(props, context) {
	    super(props, context);

	    var getDummyDates = function(startDate, endDate) {
		    var dates = [];
		    var currDate = moment(startDate).startOf('day');
		    var lastDate = moment(endDate).startOf('day');
		    while(currDate.add(1, 'days').diff(lastDate) < 0) {
		        dates.push({ "date" : currDate.clone().format('YYYY-MM-DD') });
		    }
		    return dates;
		};

	  	this.state = {
	      	numDays : 365,
	      	values: getDummyDates(moment().startOf('year'), new Date()),
	    } 
 	}

  

  	render() {
	    return (
	      	<div className="App">
		        <header className="App-header">
		        	{ 365 - this.state.values.length } days left...
		        </header>
	        	<p className="App-intro react-calendar-heatmap">
	          		<CalendarHeatmap
	          			startDate={ this.yearStart }
	            		endDate={ this.yearEnd }
	            		// numDays={this.state.numDays}
	            		values={this.state.values}
	            		className="color-scale-4"
	          		/>
	        	</p>
	      </div>
	    );
  	}
}

export default App;
