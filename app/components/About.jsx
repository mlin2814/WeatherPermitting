var React = require('react');
var {Link} = require('react-router');

var About = (props) => {
	return(
		<div>
			<h1 className="text-center page-title">About</h1>
			<p>This application is a Weather application structured through React, Javascript ES6, and Foundation for styling. Type in any city, and the temperature will be returned to you.</p>
			<p>As for me, I'm a full stack web developer looking to break into the development world and learn more about what it means to be a developer. This is just one of the many projects I've worked on and built, so take some time to look at the links below for more examples of my work. Enjoy!</p>
			<ol>
				<li>
					<a href="https://sheltered-taiga-20526.herokuapp.com/">My Portfolio</a>
				</li>
				<li>
					<a href="https://github.com/mlin2814">Github</a>
				</li>
			</ol>
		</div>	
	);
};

module.exports = About;