var React = require('react');

var Message = ({temp, location}) => {
  return (
    <h3 className="text-center">It's {temp} degrees in {location}.</h3>
  )
};

module.exports = Message;