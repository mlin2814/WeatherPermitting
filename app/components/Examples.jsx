var React = require('react');
var {Link} = require('react-router');

var Examples = (props) => {
	return(
		<div>
			<h1 className="text-center page-title">Examples</h1>
			<p>Here are some example locations to try</p>
			<ol>
				<li>
					<Link to='/?location=Austin'>Austin, Texas</Link>
				</li>
				<li>
					<Link to='/?location=Boston'>Boston, Massachussetts</Link>
				</li>
			</ol>
		</div>
	);
};

module.exports = Examples;