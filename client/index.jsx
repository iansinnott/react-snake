// Load in the debugger
// TODO: Don't load this in production
window.__debug = require('debug');

var React = require('react');

var App = require('./App.jsx');

// Render the app
React.render(<App />, document.getElementById('container'));

