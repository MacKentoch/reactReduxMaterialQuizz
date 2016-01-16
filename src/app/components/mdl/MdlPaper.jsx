// TODO : to add more customisations

/**
* COMPONENT : Mdlpaper
* WHAT FOR  : a paper container 
*
* PROPS     : 
*   - children  : {node} : optional - no default value
*       
**/


import React            from 'react';

export default class MdlPaper extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {    
    const {
      children,
      ...others
    } = this.props;
    
    return (
      <div 
        className="mdl-shadow--2dp"
        {...others} >
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            {children}
          </div>
        </div>
      </div> 
    );
  }

}

MdlPaper.propTypes = {
  children  : React.PropTypes.node
};
