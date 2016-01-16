import React            from 'react';
import MdlPaper         from '../mdl/MdlPaper.jsx!jsx';
import MdlToolBar       from '../mdl/MdlToolBar.jsx!jsx';
import RaisedButton     from 'material-ui/lib/raised-button';
import QuizQuestions    from '../QuizQuestions/QuizQuestions.jsx!jsx';
import classNames       from 'classnames';
import PromisedTimeout  from '../../services/PromisedTimeout.jsx!jsx';
import {styles}         from './quizEnd.style.jsx!jsx';


const ENTRANCE_ANIMATION_DELAY = 500;

export default class QuizEnd extends React.Component {
	
  constructor(props) {
    super(props);
    this.init();
  }
  
  init() {
    this.state = {
      animated           : true,
      invisible          : true,
      entranceAnimation  : false
    };    
  } 
    
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.showQuizEnd) {
  //     return true; 
  //   }
  //   return false; 
  // }  
    
  componentWillReceiveProps(newProps) {
    if (newProps.showQuizEnd) {
      let PromisedDelay = new PromisedTimeout();

      PromisedDelay
        .delay(ENTRANCE_ANIMATION_DELAY)
        .then(() => {        
          this.setState({
            entranceAnimation : true,
            invisible         : false
          });
        });       
    }
  }  
    
  handlePreviousStepClick() {
    this.props.onPrevQuizClick();
  }
  
  handleEndQuizClick() {
    return this.props.onValidQuizClick();
  }

  getAllAnswersTemplate() {
    const answersSummary = this.props.questions.map((question, questionIndex)=>{
      return (
        <QuizQuestions 
          key={'end' + questionIndex}
          isDisabled={true}
          onNextQuestionClick={()=>true}
          onPreviousQuestionClick={()=>true}
          onFinishQuizClick={()=>true}
          question={question}
          questionIndex={questionIndex}
          shouldUpdate={this.props.shouldUpdate}
          isFirstQuestion={questionIndex === 0 ? true : false}
          isLastQuestion={questionIndex=== this.props.questions.length - 1 ? true : false}
          goNextBtnText={'QUIZZ_NEXT_BUTTON'}
          goPreviousBtnText={'QUIZZ_PREVIOUS_BUTTON'}
          goFinishQuizBtnText={'QUIZZ_VALID_BUTTON'}
        />           
      );
    });
    return answersSummary;
  }
  
  render() {    
    const answersSummary = this.getAllAnswersTemplate();
    
    let answerSummaryClasses = classNames({
      'animated'      : this.state.animated,
      'invisible'     : this.state.invisible,
      'showSummary'   : this.state.entranceAnimation
    });
        
    return (
      <section>
        <MdlToolBar 
          backgdColor={'#3F51B5'}
          textColor={'#fff'}>
          <span className="mdl-layout-title">
            {this.context.translate[this.props.title]}
          </span>
          <div className="mdl-layout-spacer"></div>
        </MdlToolBar>
        <MdlPaper>    
          <section 
            id="quizEndSumUp"
            className={answerSummaryClasses}>
            {answersSummary}
          </section>          
          <section id="quizIntroActions">
            <div className="mdl-grid">
              <div className="mdl-layout-spacer"></div>
              <div className="mdl-cell mdl-cell--5-col">
                <RaisedButton 
                  style={Object.assign({}, styles.buttonPrevious)}
                  label={this.context.translate[this.props.prevBtnText]} 
                  primary={true}
                  onClick={()=>this.handlePreviousStepClick()} /> 
                <RaisedButton 
                  style={Object.assign({}, styles.buttonFinish)}
                  label={this.context.translate[this.props.endBtnText]} 
                  primary={true}
                  onClick={()=>this.handleEndQuizClick()} /> 
              </div>
            </div>          
          </section>
          </MdlPaper>    
      </section>
    );
  }
}


QuizEnd.propTypes = {
  onPrevQuizClick  : React.PropTypes.func.isRequired, 
  onValidQuizClick : React.PropTypes.func.isRequired, 
  questions        : React.PropTypes.array.isRequired,
  shouldUpdate     : React.PropTypes.bool.isRequired,
  title	           : React.PropTypes.string.isRequired,
  prevBtnText      : React.PropTypes.string.isRequired,
  endBtnText       : React.PropTypes.string.isRequired,
  showQuizEnd      : React.PropTypes.bool.isRequired
};

QuizEnd.defaultProps = {
  shouldUpdate     : false  
};

QuizEnd.contextTypes = {
  translate   : React.PropTypes.object
};
