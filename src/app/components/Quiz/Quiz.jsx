import React          from 'react';
import {connect}      from 'react-redux';
import {
  quizMoveStart,
  quizMoveGoNext,
  quizMoveGoPrevious,
  quizMoveEnd
}                     from '../../redux/actions/quizActions.jsx!jsx';
import classNames     from 'classnames';
import _              from 'lodash';
import MdlPaper       from '../mdl/MdlPaper.jsx!jsx';
import SwipeableViews from 'react-swipeable-views';
import QuizIntro      from '../QuizIntro/QuizIntro.jsx!jsx';
import QuizQuestions  from '../QuizQuestions/QuizQuestions.jsx!jsx';
import QuizEnd        from '../QuizEnd/QuizEnd.jsx!jsx';
import LinearProgress from 'material-ui/lib/linear-progress';
import {styles}       from './quiz.style.jsx!jsx';
import quizModel      from '../../models/quizModel.json!json';

const QUIZ_MOVE_START       = 'START_QUESTION';
const QUIZ_MOVE_GO_NEXT     = 'NEXT_QUESTION';
const QUIZ_MOVE_GO_PREVIOUS = 'PREV_QUESTION';
const QUIZ_MOVE_END         = 'END_QUESTION';


export default class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init() {
    this.state ={
      slideIndex      : 0, 
      pourcentageDone : 0,
      showProgress    : false,       
      animated        : true,
      viewEnters      : false         
    };
  }
  
  componentWillMount() {
    const rawQuizModel      = Object.assign({}, quizModel);
    const orderedQuestions  = _.sortBy(quizModel.questions, 'numero');
    const questionMaxIndex  = quizModel.questions.length;
    
    this.setState({
      viewEnters              : true,
      questionMaxIndex        : questionMaxIndex,
      lastEditedQuestionIndex : -1,
      quizMove                : QUIZ_MOVE_START,
      quizModel               : rawQuizModel, 
      quizOrderedQuestions    : orderedQuestions,
      snackbarAction          : `${this.context.translate.CLOSE_WORD}`,
      showQuizEnd             : false           
    });
  }
  
  componentWillUnmount() {
    this.setState({
      viewEnters       : false 
    });     
  }  
  
  handleChangeIndex(index) { 
    this.setState({
      slideIndex      : index
    });    
  }
  
  handleQuizStart() { 
    let previsousIndex = this.state.slideIndex;
    this.setState({
      slideIndex      : parseInt(previsousIndex, 10) + 1,
      showProgress    : true
    }); 
  }
  
  handleQuizNextQuestion(question, questionIndex) { 
    let previsousIndex        = this.state.slideIndex;
    let percentageDone        = ((parseInt(previsousIndex, 10)) / this.state.questionMaxIndex)*100;
    let roundPercentDone      = Math.round(percentageDone);
    let updatedQuestionsModel = [].concat(this.state.quizOrderedQuestions);
    
    updatedQuestionsModel[questionIndex] = question;
    
    this.setState({
      quizOrderedQuestions    : updatedQuestionsModel,
      lastEditedQuestionIndex : questionIndex,
      quizMove                : QUIZ_MOVE_GO_NEXT,
      slideIndex              : parseInt(previsousIndex, 10) + 1,
      pourcentageDone         : roundPercentDone
    }); 
    
    let message = `${this.context.translate.QUIZZ_GRATZ_PERCENT1} ${roundPercentDone}${this.context.translate.QUIZZ_GRATZ_PERCENT2}`;
    let action  = `${this.context.translate.CLOSE_WORD}`;
    this.context.displaySnackBar(message, action);
  }  
  
  handleQuizPreviousQuestion(question, questionIndex) { 
    let previsousIndex        = this.state.slideIndex;
    let percentageDone        = ((parseInt(previsousIndex, 10) - 2) / this.state.questionMaxIndex)*100;
    let roundPercentDone      = Math.round(percentageDone);
    let updatedQuestionsModel = [].concat(this.state.quizOrderedQuestions);
    
    updatedQuestionsModel[questionIndex] = question;
        
    this.setState({
      quizOrderedQuestions    : updatedQuestionsModel,
      lastEditedQuestionIndex : questionIndex,
      quizMove                : QUIZ_MOVE_GO_PREVIOUS,
      slideIndex              : parseInt(previsousIndex, 10) - 1,
      pourcentageDone         : roundPercentDone       
    }); 
  } 
  
  handleQuizEndShowSummmary(question, questionIndex) {
    let previsousIndex        = this.state.slideIndex;
    let percentageDone        = ((parseInt(previsousIndex, 10)) / this.state.questionMaxIndex)*100;
    let roundPercentDone      = Math.round(percentageDone);
    let updatedQuestionsModel = [].concat(this.state.quizOrderedQuestions);
    
    updatedQuestionsModel[questionIndex] = question;
        
    this.setState({
      quizOrderedQuestions    : updatedQuestionsModel,
      lastEditedQuestionIndex : questionIndex,
      quizMove                : QUIZ_MOVE_END,
      slideIndex              : parseInt(previsousIndex, 10) + 1,
      pourcentageDone         : roundPercentDone,
      showProgress            : true,
      snackbarOpened          : true,
      showQuizEnd             : true,
      snackbarMessage         : `${this.context.translate.QUIZZ_GRATZ_PERCENT3}`     
    });
    
    let message = `${this.context.translate.QUIZZ_GRATZ_PERCENT3}`;
    let action  = `${this.context.translate.CLOSE_WORD}`;
    this.context.displaySnackBar(message, action);         
  }
  
  handleReturnQuizLastQuestion() {
    let previsousIndex        = this.state.slideIndex;
    let percentageDone        = ((parseInt(previsousIndex, 10) - 2) / this.state.questionMaxIndex)*100;
        
    this.setState({
      slideIndex            : parseInt(previsousIndex, 10) - 1,
      pourcentageDone       : percentageDone     
    });     
  }
  
  handleQuizFinished() {
    // here : should save quiz answers to database 
    this.props.history.pushState(null, '/');   // job done so return home now 
  } 
  
  
  shouldRenderQuestion(questionIndex) {
    const {
      lastEditedQuestionIndex, 
      quizMove
    } = this.state;
      
    let _shouldUpdate = false;
      
    switch (quizMove) {
    case QUIZ_MOVE_START :
      if (questionIndex === 0) {
        return true;
      }
      break;
    case QUIZ_MOVE_GO_NEXT :
      if ((lastEditedQuestionIndex + 1) === questionIndex) {
        return true;
      }        
      break;    
    case QUIZ_MOVE_GO_PREVIOUS :
      if ((lastEditedQuestionIndex - 1) === questionIndex) {
        return true;
      }        
      break;   
    case QUIZ_MOVE_END :
      if (questionIndex === lastEditedQuestionIndex) {
        return true;
      }
      break;                      
    default:
      _shouldUpdate = true;
    }
    return _shouldUpdate;    
  }
  
    
  getSwipableViewsQuestionsTemplate() {
    // injected by connect   
    const { 
      dispatch, 
      quizMove
    }                           = this.props;
    const swipeableViewTemplate = this.state.quizOrderedQuestions.map((question, questionIndex)=>{
      let _shouldUpdate = this.shouldRenderQuestion(questionIndex);
      // let _shouldUpdate = dispatch(quizMove(questionIndex));
        
      return (
        <QuizQuestions 
          key={questionIndex}
          isDisabled={false}
          onNextQuestionClick={(inQuestion, inQuestionIndex)=>this.handleQuizNextQuestion(inQuestion, inQuestionIndex)}
          onPreviousQuestionClick={(inQuestion, inQuestionIndex)=>this.handleQuizPreviousQuestion(inQuestion, inQuestionIndex)}
          onFinishQuizClick={(inQuestion, inQuestionIndex)=>this.handleQuizEndShowSummmary(inQuestion, inQuestionIndex)}
          question={question}
          questionIndex={questionIndex}
          shouldUpdate={_shouldUpdate}
          isFirstQuestion={questionIndex === 0 ? true : false}
          isLastQuestion={questionIndex === this.state.questionMaxIndex - 1 ? true : false}
          goNextBtnText={'QUIZZ_NEXT_BUTTON'}
          goPreviousBtnText={'QUIZZ_PREVIOUS_BUTTON'}
          goFinishQuizBtnText={'QUIZZ_END_BUTTON_TEXT'}
        />           
      );
    });
    return swipeableViewTemplate;
  }
  
  getProgressTemplate() {
    let template = (
      <LinearProgress 
        style={Object.assign({}, styles.percentageBarContainer)}
        mode="determinate" 
        value={this.state.pourcentageDone} 
      />       
    );
    if (this.state.showProgress) {
      return template;
    }
    if (!this.state.showProgress) {
      return <div></div>;
    } 
  }
  
  render() {
    let quizViewClasses = classNames({
      'animatedViews'    : this.state.animated,
      'view-enter'       : this.state.viewEnters
    }); 

    const progressTemplate       = this.getProgressTemplate(); 
    const swipeableViewTemplate  = this.getSwipableViewsQuestionsTemplate();
    const tabEndIndex            = (this.state.questionMaxIndex + 1) + '';  
        
    return (
      <section 
         key="quizView"
         className={quizViewClasses}>        
        <div className="mdl-grid" key="quizz">
          <div 
            className="mdl-cell mdl-cell--12-col" 
            style={Object.assign({}, styles.quiz)}>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">
                {progressTemplate}
              </div>
            </div>         
            <SwipeableViews 
              index={parseInt(this.state.slideIndex, 10)} 
              disabled={true}
              onChangeIndex={(index, fromIndex)=>this.handleChangeIndex(index, fromIndex)} > 
              <MdlPaper key="0">
                <QuizIntro 
                  title={this.state.quizModel.intro.title_translate_id}
                  subtitle={this.state.quizModel.intro.content_1_translate_id}
                  body={this.state.quizModel.intro.content_2_translate_id}
                  goBtnText={this.state.quizModel.intro.go_button_text_id}
                  onStartQuizClick={(quiz)=>this.handleQuizStart(quiz)}
                />
              </MdlPaper>
              {swipeableViewTemplate}
              <MdlPaper key={tabEndIndex}>
                <QuizEnd 
                  title={this.state.quizModel.end.title_translate_id}
                  questions={this.state.quizOrderedQuestions}
                  showQuizEnd={this.state.showQuizEnd}
                  shouldUpdate={parseInt(this.state.slideIndex, 10) === parseInt(tabEndIndex, 10) ? true : false}
                  prevBtnText={this.state.quizModel.end.prev_button_text}
                  endBtnText={this.state.quizModel.end.end_button_text}
                  onPrevQuizClick={()=>this.handleReturnQuizLastQuestion()}
                  onValidQuizClick={()=>this.handleQuizFinished()} 
                />
              </MdlPaper>
            </SwipeableViews>            
          </div>
        </div>
      </section>
    );
  }

}


Quiz.propTypes = {
  history   : React.PropTypes.object,
  dispatch  : React.PropTypes.func.isRequired, 
  quizMove  : React.PropTypes.shape({
    shouldUpdate            : React.PropTypes.bool.isRequired,
    questionIndex           : React.PropTypes.number.isRequired,
    lastEditedQuestionIndex : React.PropTypes.number.isRequired,
    showQuizEnd             : React.PropTypes.bool.isRequired    
  }).isRequired
};

Quiz.contextTypes = {
  translate       : React.PropTypes.object,
  displaySnackBar : React.PropTypes.func
};

// state to inject from global state
function select(state) {
  return {
    quizMove: state.quizMove
  };
}
// inject dispatch and selected state from gloabl state
export default connect(select)(Quiz);
