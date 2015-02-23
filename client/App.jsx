var React = require('react');

var SnakeGame = require('./SnakeGame');

var App = React.createClass({

  render: function() {
    return (
      <SnakeGame />
    );
  }

});

module.exports = App;
