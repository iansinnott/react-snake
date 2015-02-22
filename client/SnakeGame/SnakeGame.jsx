var React = require('react/addons'), // Full React + addons
    debug = require('debug')('SnakeGame');

var BODY_CODE = 1,
    FOOD_CODE = 2,
    KEY_MAP   = { left: 37, up: 38, right: 39, down: 40 };

var SnakeGame = React.createClass({

  getInitialState: function() {
    var startIndex = 21,
        snake      = [startIndex],
        board      = [];

    board[startIndex] = BODY_CODE;

    return {
      board: board,
      snake: snake,
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
    this.setState({ paused: false });
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

    var numRows   = 20,
        numCols   = 20,
        cellSize  = 30,
        cells     = [],
        cellClass = '',
        cellCode;

    for (var row = 0; row < numRows; row++) {
      for (var col = 0; col < numCols; col++) {
        cellCode = this.state.board[numCols * row + col];

        if (cellCode === BODY_CODE)
          cellClass = '-body';
        else if (cellCode === FOOD_CODE)
          cellClass = '-food';

        cells.push(<div className={ 'cell' + cellClass }/>);
      }
    }

    return (
      <div id="snake-game">
        <h2>Snake game son</h2>
        <div
          ref='board'
          className={ classes }
          onClick={ this._handleClick }
          onKeyDown={ this._handleKey }>
          { cells }
        </div>
      </div>
    );
  }
  
});

module.exports = SnakeGame;
