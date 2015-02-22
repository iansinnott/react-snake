var React = require('react');

var SnakeGame = require('./SnakeGame');

var App = React.createClass({

  render: function() {
    return (
      <div>
        <h1>Snake!</h1>
        <SnakeGame />
      </div>
    );
  }

});

module.exports = App;
