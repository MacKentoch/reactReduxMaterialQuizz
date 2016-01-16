// action type
export const QUIZ_MOVE_START = 'QUIZ_MOVE_START';
export const QUIZ_MOVE_GO_NEXT     = 'QUIZ_MOVE_GO_NEXT';
export const QUIZ_MOVE_GO_PREVIOUS = 'QUIZ_MOVE_GO_PREVIOUS';
export const QUIZ_MOVE_END         = 'QUIZ_MOVE_END';


// action creators
export function quizMoveStart(questionIndex) {
  return {
    move          : QUIZ_MOVE_START, 
    questionIndex : questionIndex,
    showQuizEnd   : false,
    shouldUpdate  : true
  };
}

export function quizMoveGoNext(questionIndex, lastEditedQuestionIndex) {
  return {
    move                    : QUIZ_MOVE_GO_NEXT, 
    questionIndex           : questionIndex,
    // lastEditedQuestionIndex : lastEditedQuestionIndex,
    showQuizEnd             : false,
    shouldUpdate            : true
  };
}

export function quizMoveGoPrevious(questionIndex, lastEditedQuestionIndex) {
  return {
    move                    : QUIZ_MOVE_GO_PREVIOUS, 
    questionIndex           : questionIndex,
    // lastEditedQuestionIndex : lastEditedQuestionIndex,
    showQuizEnd             : false,
    shouldUpdate            : true
  };
}

export function quizMoveEnd(questionIndex, lastEditedQuestionIndex) {
  return {
    move                    : QUIZ_MOVE_END, 
    questionIndex           : questionIndex,
    // lastEditedQuestionIndex : lastEditedQuestionIndex,
    showQuizEnd             : true,
    shouldUpdate            : true
  };
}
