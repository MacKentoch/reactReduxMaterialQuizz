import { 
  createStore, 
  applyMiddleware,
  compose
}                         from 'redux';
import thunkMiddleware    from 'redux-thunk';
import createLogger       from 'redux-logger';
import quizReducer        from '../reducers/quizReducers.jsx!jsx';
import DevTools           from '../../components/devTools/DevTools.jsx!jsx';

const loggerMiddleware = createLogger({
  level     : 'info',
  collapsed : true
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(quizReducer, initialState);
}
