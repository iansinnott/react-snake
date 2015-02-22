var React = require('react');

var SnakeGame = React.createClass({

  getInitialState: function() {
    return {};
  },

  _handleClick: function(e) {
    console.log('hey nice click');
  },

  _handleKey: function(e) {
    console.log('hey nice key', e.which);
  },

  render: function() {
    return (
      <div id="snake-game">
        <h2>Snake game son</h2>
        <div
          className='board'
          onClick={ this._handleClick }
          onKeyDown={ this._handleKey }
        />
      </div>
    );
  }
  
});

module.exports = SnakeGame;
