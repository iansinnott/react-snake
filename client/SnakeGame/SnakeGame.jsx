var React = require('react/addons'), // Full React + addons
    debug = require('debug')('SnakeGame');

var BODY_CODE = 1,
    FOOD_CODE = 2,
    KEY_MAP   = { left: 37, up: 38, right: 39, down: 40 },
    VIM_MAP   = { H: 72, J: 74, K: 75, L: 76 };

// Config
var numRows   = 20,
    numCols   = 20;


function getNextIndex(index, direction) {
  debug('getting next index from %d. keycode: %d', index, direction);
  var x = index % numCols,
      y = Math.floor(index / numRows);

  switch (direction) {
    case KEY_MAP.left:
      x = (x <= 0) ? numCols - 1 : x - 1;
      break;
    case KEY_MAP.up:
      y = (y <= 0) ? numRows - 1 : y - 1;
      break;
    case KEY_MAP.right:
      x = (x >= numCols - 1) ? 0 : x + 1;
      break;
    case KEY_MAP.down:
      y = (y >= numRows - 1) ? 0 : y + 1;
      break;
  }

  return (y * numCols) + x;
}

var SnakeGame = React.createClass({

  getInitialState: function() {
    var startIndex = 21,
        snake      = [startIndex],
        board      = [];

    board[startIndex] = BODY_CODE;

    return {
      board: board,
      snake: snake,
      direction: KEY_MAP.right,
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

  _resume: function() {
    if (!this.state.paused) return;
    debug('resuming game');
    this.setState({ paused: false }, this._tick);
  },

  /**
   * Handle key pressees for controlling the snake
   */
  _handleKey: function(e) {
    debug('hey nice key', e.which);
    if ([37, 38, 39, 40].indexOf(e.which) === -1) return;
    this._nextDirection = e.which;
  },

  _pause: function() {
    debug('Pausing game');
    this.setState({ paused: true });
  },

  _tick: function() {
    if (this.state.paused) return;

    debug('game not paused, ticking')

    var gameSpeed = 300, // Lower Number  = > Faster Game speed
        snake     = this.state.snake,
        board     = this.state.board,
        direction = this.state.direction,
        head      = getNextIndex(snake[0], direction),
        needsFood = board[head] === FOOD_CODE || snake.length === 1,
        randomIndex;

    if (needsFood) {

      // Keep on generating a random index until we find an empty square on the
      // board, i.e. until board[randomIndex] === undefined
      do {
        randomIndex = Math.floor(Math.random() * numRows * numCols);
      } while (board[randomIndex]);

      board[randomIndex] = FOOD_CODE;
    } else {
      board[snake.pop()] = null;
    }

    snake.unshift(head);     // Updaet snake head position
    board[head] = BODY_CODE; // Update array code so it gets rendered as snake body

    if (this._nextDirection) {
      direction = this._nextDirection;
      this._nextDirection = null;
    }

    this.setState({
      snake: snake,
      board: board,
      direction: direction
    });

    setTimeout(this._tick, gameSpeed);
  },

  render: function() {
    var classes = React.addons.classSet({
      board: true,
      paused: this.state.paused
    });

    var cellSize = 30,
        cells    = [],
        cellClass,
        cellCode;

    for (var row = 0; row < numRows; row++) {
      for (var col = 0; col < numCols; col++) {
        cellCode = this.state.board[numCols * row + col];

        if (cellCode === BODY_CODE)
          cellClass = '-body';
        else if (cellCode === FOOD_CODE)
          cellClass = '-food';
        else
          cellClass = '';

        cells.push(<div className={ 'cell' + cellClass }/>);
      }
    }

    return (
      <div id="snake-game">
        <h2>Snake game son</h2>
        <div
          ref='board'
          className={ classes }
          onFocus={ this._resume }
          onBlur={ this._pause }
          onKeyDown={ this._handleKey }
          tabIndex='0'>
          { cells }
        </div>
        <div class="controls">
          <button class="reset" onClick={ this._reset }>Reset</button>
          <button class="resume" onClick={ this._start }>Resume</button>
        </div>
      </div>
    );
  }
  
});

module.exports = SnakeGame;
