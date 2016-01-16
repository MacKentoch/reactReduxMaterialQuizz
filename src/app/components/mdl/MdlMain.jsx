/**
* COMPONENT : MdlMain
* WHAT FOR  : Main content - rour application main content should be children of this component 
*
* PROPS     : 
*   - children  : {node} : REQUIRED - no default value  
**/


import React            from 'react';

export default class MdlMain extends React.Component {

  constructor(props) {
    super(props);
  }

  render() { 
    const {...others} = this.props;   
    return (
      <main
        className="mdl-layout__content"
        {...others}>
        <div className="page-content">
          {this.props.children}
       </div>
      </main>
    );
  }

}

MdlMain.propTypes = {
  children  : React.PropTypes.node.isRequired
};
