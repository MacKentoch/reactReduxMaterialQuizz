import React            from 'react';
import classNames       from 'classnames';
import PromisedTimeout  from '../../services/PromisedTimeout.jsx!jsx'; 
import MdlPaper         from '../mdl/MdlPaper.jsx!jsx';
import MdlToolBar       from '../mdl/MdlToolBar.jsx!jsx';
import RaisedButton     from 'material-ui/lib/raised-button';


export default class QuizIntro extends React.Component {
	
  constructor(props) {
    super(props);
    this.init();
  }
	
  init() {
    // console.dir(this.context); //=> context does not exist here
    this.state = {
      animated                : true,
      subTitleAnimationActive : false,
      bodyAnimationActive     : false
    };
  }
  
  componentDidMount() {
    let PromisedDelay = new PromisedTimeout();
    
    PromisedDelay
      .delay(500)
      .then(
        ()=>{
          this.setState({
            subTitleAnimationActive : true,
            bodyAnimationActive     : true      
          });        
        }
       );
  }
   
  handleStartQuizClick() {
    this.props.onStartQuizClick({start : true});
  }
	
  render() {  
    let subTitleClasses = classNames({
      'animated'    : this.state.animated,
      'invisible'   : !this.state.subTitleAnimationActive,
      'fadeInDown'  : this.state.subTitleAnimationActive
    });
    let bodyClasses = classNames({
      'animated'    : this.state.animated,
      'invisible'   : !this.state.bodyAnimationActive,
      'fadeInDown'  : this.state.bodyAnimationActive
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
          <section id="quizIntroBody">
            <h5 className={subTitleClasses}>
              {this.context.translate[this.props.subtitle]}
            </h5>
            <p className={bodyClasses}>
              {this.context.translate[this.props.body]}
            </p>
          </section>
          <section id="quizIntroActions">
            <div className="mdl-grid">
              <div className="mdl-layout-spacer"></div>
              <div className="mdl-cell mdl-cell--4-col mdl-typography--text-center">
                <RaisedButton 
                  label={this.context.translate[this.props.goBtnText]} 
                  primary={true}
                  onClick={()=>this.handleStartQuizClick()} 
                  />  
              </div>
              <div className="mdl-layout-spacer"></div>
            </div>          
          </section>
        </MdlPaper>
      </section> 
    );
  }
}


QuizIntro.propTypes = {
  onStartQuizClick : React.PropTypes.func.isRequired, 
  title	           : React.PropTypes.string.isRequired,
  subtitle		     : React.PropTypes.string.isRequired,
  body		         : React.PropTypes.string.isRequired,
  goBtnText        : React.PropTypes.string.isRequired
};


QuizIntro.contextTypes = {
  translate : React.PropTypes.object
};

