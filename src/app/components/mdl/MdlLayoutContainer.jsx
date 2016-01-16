/*  global componentHandler  */

// TODO : to add more customisations to change application layout (fixed nav, fixed sidenav...)

/**
**********************************************************************
* COMPONENT : MdlLayoutContainer - IMPORTANT : TOP ROOT COMPONENT-
**********************************************************************
* WHAT FOR  : You application container - IMPORTANT : should be top root mdl component of your application 
* OTHERWISE : on your top root component, you will have 
*    - to add componentHandler.upgradeDom()  //to tell mdl about its components currently in the DOM
*    - to add layout classes
*
*
* PROPS     : 
*   - children  : {node} : REQUIRED - no default value  
**/


import React            from 'react';

export default class MdlLayoutContainer extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // MDL - React trick This upgrades all upgradable components at 1st render
    componentHandler.upgradeDom();    
  }

  componentDidUpdate() {
    componentHandler.upgradeDom(); 
  }

  render() {  
    const {
      ...others
    } = this.props;  
    
    return (
      <div className="mdl-layout__container" {...others}>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        {this.props.children}
       </div>
      </div> 
    );
  }

}

MdlLayoutContainer.propTypes = {
  children  : React.PropTypes.node.isRequired
};
