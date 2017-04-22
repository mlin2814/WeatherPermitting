var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
	onSearch:function(e){
		e.preventDefault();
		alert('Not ready!');
	},
	render: function () {
		return(
			<div className="top-bar">
				<div className="top-bar-left">
					<ul className="menu">
						<li className="menu-text">Weather Reaction</li>					
						<li>
							<IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Get Weather</IndexLink>
						</li>
						<li>
							<Link to="/about" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>About the App</Link>
						</li>
						<li>
							<Link to="/examples" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Example Cities</Link>
						</li>
					</ul>
				</div>
				<div className="top-bar-right">
					<form onSubmit={this.onSearch}>
						<ul className="menu">
						  <li>
							<button className="button expanded"> Sign UP </button>
						 </li>
					      <li>
					      	<input type="search" placeholder="Search temperature by city"/>
					      </li>
					      <li>
					      	<input type="submit" className="button" value="Reveal the Weather!"/>
					      </li>
					    </ul>
					</form>
				</div>
			</div>
		);		
	}
});

module.exports = Nav;

