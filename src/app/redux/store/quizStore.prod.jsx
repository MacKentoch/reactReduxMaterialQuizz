import { 
  createStore, 
  applyMiddleware, 
  compose 
}                         from 'redux';
import thunkMiddleware    from 'redux-thunk';
import createLogger       from 'redux-logger';
import quizReducer        from '../reducers/quizReducers.jsx!jsx';

const loggerMiddleware = createLogger({
  level     : 'info',
  collapsed : true
});

const finalCreateStore = compose(
  // Middleware you want to use in production:
  applyMiddleware(thunkMiddleware, loggerMiddleware)
  // Other store enhancers if you use any
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(quizReducer, initialState);
};
