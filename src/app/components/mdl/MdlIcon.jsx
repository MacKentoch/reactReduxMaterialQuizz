// TODO : to add more customisations

/**
* COMPONENT : MdlIcon
* WHAT FOR  : a material design lite icon 
*
* PROPS     : 
*   - iconName  : {string} : REQUIRED - no default value
*     trick : search your icon name from here : https://design.google.com/icons/  
**/


import React            from 'react';

export default class MdlIcon extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {    
    const {
      iconName,
      ...others
    } = this.props;
    return (
      <i 
        className="material-icons"
        {...others} >
        {iconName}
      </i> 
    );
  }

}

MdlIcon.propTypes = {
  iconName  : React.PropTypes.string.isRequired
};
