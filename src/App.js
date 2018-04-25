import React, { Component } from 'react';
import './App.css';
import SettingsIcon from './cogwheel.svg';
import moment from 'moment';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


import YearHeatmap from './Year/year-heatmap'
import MonthHeatmap from './Month/month-heatmap'
import WeekHeatmap from './Week/week-heatmap'
import DayHeatmap from './Day/day-heatmap'

class App extends Component {

	currentView = '';

  	constructor(props, context) {
	    super(props, context);

	    this.toggle = this.toggle.bind(this);

	  	this.state = {
	      	dropdownOpen: false,
	      	view : "day",
	      	now : moment().format("dddd, MMMM Do YYYY, hh:mm:ss A")
	    } 

	    this.updateView( this.state.view );
 	}

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  	componentDidMount() {
 		let intervalId = setInterval(function(){
			this.setState( { now : moment().format("dddd, MMMM Do YYYY, hh:mm:ss A") })
		}.bind(this),1000);
		this.setState({intervalId: intervalId});
 	}

	componentWillUnmount(){
	   // use intervalId from the state to clear the interval
	   clearInterval(this.state.intervalId);
	}

  updateView( type ) {
  	if( type === "year" ){
  		this.currentView = <YearHeatmap />
  	} else if( type === "month" ) {
  		this.currentView = <MonthHeatmap />
  	} else if( type === "week" ) {
  		this.currentView = <WeekHeatmap />
  	} else if( type === "day" ) {
  		this.currentView = <DayHeatmap />
  	}
  }

  shouldComponentUpdate() {
    return !document.hidden;
  }


  	render() {
	    return (
	      	<div className="App">
	        	<div className="App-intro">
	        		{ this.currentView }
	        	</div>

	        	<div className="Dropdown-menu-container">
		        	<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="Dropdown-menu">
				        <DropdownToggle>
				          <img src={SettingsIcon} className="Settings-icon" alt="icon" />
				        </DropdownToggle>
				        <DropdownMenu>
				          <DropdownItem onClick={ this.updateView.bind(this, 'year') }>Year</DropdownItem>
				          <DropdownItem onClick={ this.updateView.bind(this, 'month') }>Month</DropdownItem>
				          <DropdownItem onClick={ this.updateView.bind(this, 'week') }>Week</DropdownItem>
				          <DropdownItem onClick={ this.updateView.bind(this, 'day') }>Day</DropdownItem>
				          <DropdownItem divider />
				          <DropdownItem>Action</DropdownItem>
				        </DropdownMenu>
				      </Dropdown>
		        </div>

		        <div className="timestamp">
		        	<span>{ this.state.now }</span>
		        </div>
	      </div>
	    );
  	}
}

export default App;
