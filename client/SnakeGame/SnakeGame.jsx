var React = require('react/addons'), // Full React + addons
    debug = require('debug')('SnakeGame');

var SnakeGame = React.createClass({

  getInitialState: function() {
    return {
      paused: true
    };
  },

  // Called after component is rendered
  componentDidMount: function() {
    this._start();
  },

  /**
   * Start/resume the game.
   */
  _start: function() {
    debug('Game starting. Focusing board');
    this.refs.board.getDOMNode().focus();
  },

  /**
   * Debug function
   */
  _handleClick: function(e) {
    debug('hey nice click');
  },

  /**
   * Handle key pressees for controlling the snake
   */
  _handleKey: function(e) {
    debug('hey nice key', e.which);
  },

  render: function() {
    var classes = React.addons.classSet({
      board: true,
      paused: this.state.paused
    });

    return (
      <div id="snake-game">
        <h2>Snake game son</h2>
        <div
          ref='board'
          className={ classes }
          onClick={ this._handleClick }
          onKeyDown={ this._handleKey }
        />
      </div>
    );
  }
  
});

module.exports = SnakeGame;
