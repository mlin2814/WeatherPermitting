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


module.exports = Form;