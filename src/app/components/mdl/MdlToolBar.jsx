/**
* COMPONENT : MdlToolBar
* WHAT FOR  : a toolbar can be nice as card headers for example (looks like AppNavBar) 
*
* PROPS     : 
*   - backgdColor   : {string} : optional - default is '#3F51B5'
*   - textColor     : {string} : optional - default is '#fff'
*   - children      : {node}   : optional - no default
*
*
*
* usage example :
* 
*  <MdlToolBar >
*   <span className="mdl-layout-title">test</span>
*   <div className="mdl-layout-spacer"></div>
*  </MdlToolBar>
*
**/

import React            from 'react';

export default class MdlToolBar extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    const {
      backgdColor,
      textColor,
      children,
      ...others
    } = this.props;
    
    const toolbarStyle = {
      boxSizing   : 'border-box',
      position    : 'relative',
      background  : backgdColor,
      color       : textColor,
      height      : '64px',
      width       : '100%',
      padding     : '16px'
    };
    
    return (
      <div 
        className="mdl-shadow--2dp" 
        {...others}
        style={toolbarStyle}>
        {children}
      </div>      
    );
  }
  
}


MdlToolBar.propTypes = {
  backgdColor : React.PropTypes.string,
  textColor   : React.PropTypes.string,
  children    : React.PropTypes.node
};

MdlToolBar.defaultProps = {
  backgdColor      : '#3F51B5',
  textColor        : '#fff'
};

