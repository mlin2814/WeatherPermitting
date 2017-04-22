var React = require('react');
var Form = require('Form');
var Message = require('Message');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');
var Slider = require('Slider');

var Weather = React.createClass({
	getInitialState: function() {
		return {
			isLoading: false
		}
	},
	handleSearch: function(location){
		var that = this;

		debugger;

		this.setState({
			isLoading: true,
			errorMessage: undefined
		});

		openWeatherMap.getTemp(location).then(function (temp) {
			that.setState({
				location: location,
				temp: temp,
				isLoading: false
			});
		}, function(e){
			that.setState({
				isLoading: false,
				errorMessage: e.message
			});
		});
	},
	render: function() {
		var {isLoading, temp, location, errorMessage} = this.state;

		function renderMessage(){
			if (isLoading) {
				return <h3 className="text-center">Collecting Weather Information</h3>;
			} else if (temp && location) {
				return <Message temp={temp} location={location}/>;
			}
		}

		function renderError() {
			if (typeof errorMessage === 'string') {
				return(
					<ErrorModal message={errorMessage}/>
				)
			}
		}

		return(
			<div>
				<h1 className="text-center page-title">Weather Permitting</h1>	
				<form action="hot">
				    <p class="range-field">
				    <input type="range" id="test5" min="0" max="120" />
				  </p>
				</form>
				<form action="warm">
				    <p class="range-field">
				    <input type="range" id="test5" min="0" max="120" />
				  </p>
				</form>
				<form action="cool">
				    <p class="range-field">
				    <input type="range" id="test5" min="0" max="120" />
				  </p>
				</form>
				<form action="cold">
				    <p class="range-field">
				    <input type="range" id="test5" min="0" max="120" />
				  </p>
				</form>

				<Form onSearch={this.handleSearch}/>
				{renderMessage()}
				{renderError()}
			</div>
		);
	}
});

module.exports = Weather;