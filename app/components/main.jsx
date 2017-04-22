var React = require('react');
var Nav = require('Nav');

var Main = (props) => {
	return(
		<div>
			<Nav/>
			<div className="row">
				<div className="columns medium-6 large-4 small-centered">
					{props.children}
				</div>
				<div className="row">
					<div className="columns medium-6 large-4 small-centered">
					<div className="weather-slider">
						<form action="POST">
    						<p class="range-field">
      						<input type="range" id="test5" min="0" max="100" />
    						</p>
							<p class="range-field">
      						<input type="range" id="test5" min="0" max="100" />
    						</p>
							<p class="range-field">
      						<input type="range" id="test5" min="0" max="100" />
    						</p>
							<p class="range-field">
      						<input type="range" id="test5" min="0" max="100" />
    						</p>
							<button className="button"> Save </button>
  						</form>
					</div>	
				</div>
				</div>
			</div>
		</div>
	);
}

module.exports = Main;