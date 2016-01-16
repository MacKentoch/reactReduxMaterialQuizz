import { 
  createStore, 
  applyMiddleware, 
  compose 
}                         from 'redux';
import thunkMiddleware    from 'redux-thunk';
import createLogger       from 'redux-logger';
import { persistState }   from 'redux-devtools';
import quizReducer        from '../reducers/quizReducers.jsx!jsx';
import DevTools           from '../../components/DevTools/DevTools.jsx!jsx';

const loggerMiddleware = createLogger({
  level     : 'info',
  collapsed : true
});

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument() // ,
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  // persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(initialState) {
  const store = finalCreateStore(quizReducer, initialState);

  // // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  // if (module.hot) {
  //   module.hot.accept('../reducers', () =>
  //     store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
  //   );
  // }

  return store;
}