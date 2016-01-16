import React                    from 'react';
import Router, { 
  Route,
  IndexRoute,
  browserHistory 
 }                              from 'react-router';
import { 
  compose, 
  createStore, 
  combineReducers, 
  applyMiddleware 
}                               from 'redux';
import { Provider }             from 'react-redux';
import { 
  syncHistory, 
  routeReducer 
}                               from 'redux-simple-router';
import ReactMaterialQuizz       from '../ReactMaterialQuizz/ReactMaterialQuizz.jsx!jsx'; 
import Home                     from '../Home/Home.jsx!jsx';  
import Quiz                     from '../Quiz/Quiz.jsx!jsx';  

// IMPORTANT : PRODUCTION : Store WITHOUT redux-devtools :
//import configureStore           from '../../redux/store/quizStore.prod.jsx!jsx';

// IMPORTANT : DEVELOPEMENT : Store WITH redux-devtools :
import configureStore           from '../../redux/store/quizStore.dev.jsx!jsx';



const store = configureStore();

// INFO : Route is written as a "stateless functionnal component" (= ES6 arrow function is enough to describe it - see React V0.14 major changes) 
export const Routes = ()=>{
  return (
    <Provider store={store}>
      <Router >
        <Route path="/" component={ReactMaterialQuizz}>
          <IndexRoute component={Home} />
          <Route path="quiz" component={Quiz} />
        </Route>
      </Router>
    </Provider>
  );
};

// html5 style : static website would not work like that
// export const Routes = ()=>{
//   return (
//     <Router history={createBrowserHistory()}>
//       <Route path="/" component={ReactMaterialQuizz}>
//         <IndexRoute component={Home} />
//         <Route path='about' component={About} />
//         <Route path="quiz" component={Quiz} />
//       </Route>
//     </Router>
//   );
// };
