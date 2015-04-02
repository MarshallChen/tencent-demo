var React = require('react/addons');
var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function(action) {
  console.log('View Action: ', action);
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

AppDispatcher.handleServerAction = function(action) {
  console.log('Server Action: ', action);
  this.dispatch({
    source: 'SERVER_ACTION',
    action: action
  });
}

module.exports = AppDispatcher;

