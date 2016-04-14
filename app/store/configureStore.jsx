var redux = require('redux');
var {searchTextReducer, showCompletedReducer, todosReducer, loginReducer} = require('reducers');
import thunk from 'redux-thunk';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
    login: loginReducer
  });

  const logger = store => next => action => {
    var result;

    if (typeof action === 'function') {
      result = action(store.dispatch, store.getState)
    } else {
      result = next(action)
    }

    localStorage.setItem('login', JSON.stringify(
      store.getState().login
    ));

    return result
  }


  // const localStorageMiddleware = ({getState}) => {
  //   return (next) => (action) => {
  //     const prevState = getState();
  //     const returnValue = next(action);
  //     const nextState = getState();
  //     debugger;
      // localStorage.setItem('login', JSON.stringify(
      //   getState().login
      // ));
  //     return returnValue;
  //   };
  // };

  try {
    var loginObj = JSON.parse(localStorage.getItem('login'));
    // debugger;
    initialState.login = loginObj
  } catch (e) {
    initialState.login = undefined;
  }

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(logger),
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
