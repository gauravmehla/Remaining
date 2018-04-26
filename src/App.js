import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, ButtonGroup, Button } from 'reactstrap';
import { SketchPicker } from 'react-color';
import moment from 'moment';

// Views
import YearHeatmap 	from './Year/year-heatmap'
import MonthHeatmap from './Month/month-heatmap'
import WeekHeatmap 	from './Week/week-heatmap'
import DayHeatmap 	from './Day/day-heatmap'

// assets
import './App.css';
import SettingsIcon from './cogwheel.svg';

class App extends Component {

  	constructor(props, context) {
	    super(props, context);

	    this.toggle = this.toggle.bind(this);

	  	this.state = {
	      	dropdownOpen: false,
	      	now : moment().format("dddd, MMMM Do YYYY, hh:mm:ss A"),
	      	view : localStorage.getItem('view-type') ? localStorage.getItem('view-type') : 'year'
	    } 

	    this.getBackgroundColor();
	    this.updateView( this.state.view );
 	}

 	getBackgroundColor() {
 		let anySavedColor = localStorage.getItem('background')
 		if( !anySavedColor ) {
	    	localStorage.setItem('background', '#b54141');
	    	return '#b54141';
	    } else {
	    	return localStorage.getItem('background');
	    }
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
	  	} else {
	  		return false;
	  	}
	  	localStorage.setItem('view-type', type);
	}

	shouldComponentUpdate() {
	    return !document.hidden;
	}

	redirect( url ) {
		window.open(url, '_blank');
	}

	isActiveClass( type) {
		return localStorage.getItem('view-type') === type ? 'active' : '';
	}

	handleChangeComplete(color) {
		localStorage.setItem('background', color.hex );
	};

  	render() {
  		let selectedColor = this.getBackgroundColor();
  		let style = `
  			.yearColor { fill : ${ selectedColor }}
  			.done { background : ${ selectedColor } !important}
  		`;
	    return (
	    	<div>
		    	<style type="text/css"> { style } </style>
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
				        	  <ButtonGroup className="button-group" size="sm">
						        <Button className={ this.isActiveClass('year') } onClick={ this.updateView.bind(this, 'year') }>Year</Button>
						        <Button className={ this.isActiveClass('month') } onClick={ this.updateView.bind(this, 'month') }>Month</Button>
						        <Button className={ this.isActiveClass('week') } onClick={ this.updateView.bind(this, 'week') }>Week</Button>
						        <Button className={ this.isActiveClass('day') } onClick={ this.updateView.bind(this, 'day') }>Day</Button>
						      </ButtonGroup> 
					          <SketchPicker 
					          	color={ localStorage.getItem('background') }
	        					onChange={ this.handleChangeComplete }
	        					disableAlpha={true}
	        				  />
	        				  <ButtonGroup className="button-group" size="sm">
						        <Button onClick={()=> { this.redirect("http://gauravmehla.github.io/Remaining") } }> About </Button>
						      </ButtonGroup>
					        </DropdownMenu>
					      </Dropdown>
			        </div>

			        <div className="timestamp">
			        	<span>{ this.state.now }</span>
			        </div>
		      </div>
	      </div>
	    );
  	}
}

export default App;
