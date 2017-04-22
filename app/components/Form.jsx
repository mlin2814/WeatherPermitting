var React = require('react');

var Form = React.createClass({
	onFormSubmit: function(e){
		e.preventDefault();

		var location = this.refs.location.value;

		if (location.length > 0) {
	      this.refs.location.value = '';
	      this.props.onSearch(location);
	    }
	},
	render: function(){		
		return(
			<div>
				<form onSubmit={this.onFormSubmit}>
	        		<input type="search" ref="location" placeholder="Search temperature by city"/>
	        		<button className="button expanded">Tell me the Weather!</button>
	      		</form>
			</div>
		);
	}
});

// var FormLocation = React.createClass({
// 	onFormSubmit: function(e){
// 		e.preventDefault();

// 	    var location = this.refs.location.value;

// 	    if (location.length > 0) {
// 	      this.refs.location.value = '';
// 	      this.props.onNewLocation(location);
// 	    }
// 	},
// 	render: function(){
// 		return (
// 	      <div>
// 	      	<form onSubmit={this.onFormSubmit}>
// 	        	<input type="text" ref="location"/>
// 	        	<button>Set location</button>
// 	      	</form>
// 	      </div>
//     	);
// 	}
// })


// var DisplayForm = React.createClass({
// 	getDefaultProps: function(){
// 		return {
// 			location: 'Nowhere'
// 		};
// 	},
// 	getInitialState: function() {
// 		return {
// 			location: this.props.location
// 		}
// 	},
// 	handleNewLocation: function(name){
// 		this.setState({
// 			location: location
// 		});
// 	},
// 	render: function(){
// 		var location = this.state.location;
// 		return(
// 			<div>
// 				<Form location={location}/>
// 				<FormLocation onNewLocation={this.handleNewLocation}/>
// 			</div>
// 		);
// 	}	
// });

module.exports = Form;