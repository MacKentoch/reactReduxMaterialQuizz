import { combineReducers }  from 'redux';
import { 
  QUIZ_MOVE_START, 
  QUIZ_MOVE_GO_NEXT, 
  QUIZ_MOVE_GO_PREVIOUS, 
  QUIZ_MOVE_END 
}                           from '../actions/quizActions.jsx!jsx';


const DEFAULT_SHOULD_UPDATE = false;

const initialQuizMoveState = {
  shouldUpdate            : DEFAULT_SHOULD_UPDATE,
  questionIndex           : 0,
  lastEditedQuestionIndex : -1,
  showQuizEnd             : false 
};  


function quizMove(state = initialQuizMoveState, action) {
  switch (action.move) {

  case QUIZ_MOVE_START:
    if (action.questionIndex === 0) {
      return Object.assign({}, state, {
        shouldUpdate            : true,
        questionIndex           : 0,
        lastEditedQuestionIndex : 0,
        showQuizEnd             : false
      });
    }
    return Object.assign({}, state, {
      shouldUpdate            : DEFAULT_SHOULD_UPDATE,
      ...state
    });

  case QUIZ_MOVE_GO_NEXT:
    if ((state.lastEditedQuestionIndex + 1) === action.questionIndex) {
      return Object.assign({}, state, {
        shouldUpdate            : true,
        questionIndex           : action.questionIndex,
        lastEditedQuestionIndex : action.questionIndex,          
        showQuizEnd             : false
      });
    }
    return Object.assign({}, state, {
      shouldUpdate            : DEFAULT_SHOULD_UPDATE,
      ...state
    });

  case QUIZ_MOVE_GO_PREVIOUS:
    if ((state.lastEditedQuestionIndex - 1) === action.questionIndex) {
      return Object.assign({}, state, {
        shouldUpdate            : true,
        questionIndex           : action.questionIndex,
        lastEditedQuestionIndex : action.questionIndex,
        showQuizEnd             : false          
      });
    }
    return Object.assign({}, state, {
      shouldUpdate            : DEFAULT_SHOULD_UPDATE,
      ...state
    });

  case QUIZ_MOVE_END:
    if (action.questionIndex === state.lastEditedQuestionIndex) {
      return Object.assign({}, state, {
        shouldUpdate            : true,
        questionIndex           : action.questionIndex,
        lastEditedQuestionIndex : state.lastEditedQuestionIndex,
        showQuizEnd             : true 
      });
    }
    return Object.assign({}, state, {
      shouldUpdate            : DEFAULT_SHOULD_UPDATE,
      ...state
    });    


  default:
    return state;
  }
}

const quizReducer = combineReducers({
  quizMove
});

export default quizReducer;
