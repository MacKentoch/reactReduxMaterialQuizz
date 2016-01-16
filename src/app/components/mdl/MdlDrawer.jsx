/**
* COMPONENT : MdlDrawer
* WHAT FOR  : material design lite sidebar or sideMenu
*
* PROPS     : 
*
*   - title             : {string} : optional - default value = '' 
*   - titleFontSize     : {number} : optional - default value = 20
*   - titleFontSizeUnit : {string} : optional - default value = 'px'
*
*   - navigation    : {array of NavigationItem_Object}  : REQUIRED - no default
*     - NavigationItem_Object   : {Object} :  REQUIRED - no default
*       - NavigationItem_Object.label         : {string}    :  REQUIRED   - no default
*       - NavigationItem_Object.route         : {string}    : optional    - default = ''
*       - NavigationItem_Object.mdlIconName   : {string}    : optional    - no default
*
*   - onSelection         : {function(event, navigationItemLabel, route)}  :  optional  - no default
*   - closeOnNavigation   : {bool}  :  optional  - default = false 
*        
*this.forceDrawerToggle();
**/


import React            from 'react';
import MdlIcon          from './MdlIcon.jsx!jsx';
import {styles}         from './MdlDrawer.style.jsx!jsx';

const OBFUSCATOR_CLASSNAME      = 'mdl-layout__obfuscator';
const ROOT_MDL_DRAWER_CLASSNAME = 'mdl-layout__drawer';
const IS_DRAWER_OPEN_CLASSNAME  = 'is-visible';

export default class MdlDrawer extends React.Component {

  constructor(props) {
    super(props); 
  }

  forceDrawerClose() {
    let rootMdlDrawer = document.querySelector(['.', ROOT_MDL_DRAWER_CLASSNAME].join(''));
    let obfuscator    = document.querySelector(['.', OBFUSCATOR_CLASSNAME].join('')); 
    if (rootMdlDrawer && obfuscator) {
      if (rootMdlDrawer.classList.contains(IS_DRAWER_OPEN_CLASSNAME)) {
        rootMdlDrawer.classList.toggle(IS_DRAWER_OPEN_CLASSNAME);
        obfuscator.classList.toggle(IS_DRAWER_OPEN_CLASSNAME);        
      }
    } 
  }

  handleMenuClick(event, navigationItemLabel, navigationRoute) {
    event.preventDefault();
    if (this.props.closeOnNavigation) {
      this.forceDrawerClose();
    }
    this.props.onSelection(event, navigationItemLabel, navigationRoute);
  }

  render() {
    const {
      title,
      titleFontSize,
      titleFontSizeUnit,
      navigation,
      ...others
    } = this.props;
    
    const titleStyle = {
      fontSize : [titleFontSize, titleFontSizeUnit].join('')
    };
        
    return (
      <div className="mdl-layout__drawer mdl-shadow--2dp" {...others}>
        <span className="mdl-layout-title" style={titleStyle}>{title}</span>
        <nav className="mdl-navigation">
          {
            navigation.map((navigationItem, navigationItemIndex)=>{
              let navigationRoute = navigationItem.route || '';
              let mdlIcon = '';
              if (typeof navigationItem.mdlIconName !== 'undefined') {
                mdlIcon = (
                  <MdlIcon
                    style={Object.assign({}, styles.navItemIcon)} 
                    iconName={navigationItem.mdlIconName} 
                  />
                );
              }
              
              return (
                <a 
                  key={navigationItemIndex}
                  style={Object.assign({}, styles.navItem)}
                  className="mdl-navigation__link" 
                  href=""
                  onClick={(e)=>this.handleMenuClick(e, navigationItem.label, navigationRoute)}>
                  {mdlIcon}
                  {navigationItem.label}
                </a>
              );              
            })
          }
        </nav>
      </div>
    );
  }

}

MdlDrawer.propTypes = {
  title               : React.PropTypes.string,
  titleFontSize       : React.PropTypes.number,
  titleFontSizeUnit   : React.PropTypes.string,
  navigation          : React.PropTypes.arrayOf(
    React.PropTypes.shape({
      'label'       : React.PropTypes.string.isRequired,
      'route'       : React.PropTypes.string, 
      'mdlIconName' : React.PropTypes.string
    }).isRequired
  ).isRequired,
  closeOnNavigation   : React.PropTypes.bool,
  onSelection         : React.PropTypes.func  
};

MdlDrawer.defaultProps = {
  title      : '',
  titleFontSize     : 20,
  titleFontSizeUnit : 'px',
  closeOnNavigation : false
};
