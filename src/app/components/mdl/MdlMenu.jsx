/**
* COMPONENT : MdlMenu
* WHAT FOR  : material design lite Menu
*
* PROPS     : 
*   - menuId        : {string}    : REQUIRED - no default value
*
*   - materialIcon  : {string}    : optional - default value = 'more_vert' -> which is the vertical 3 dots icons
*
*   - menus         : {array of Menu_Object}  : REQUIRED - no default
*     - Menu_Object   : {Object} :  REQUIRED - no default
*       - Menu_Object.name        : {string}    :  REQUIRED   - no default
*       - Menu_Object.disabled    : {bool}      :  REQUIRED   - no default
*       - Menu_Object.mdlIconName : {string}    : optional    - no default
*
*   - onSelection : {function(event, menuId, menuItemIndex)}  :  optional  - no default
*        
**/

import React      from 'react';
import MdlIcon    from './MdlIcon.jsx!jsx';
import {styles}   from './MdlMenu.style.jsx!jsx';

export default class MdlMenu extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  handleMenuClick(event, menuId, menuItemIndex) {
    if (typeof this.props.onSelection !== 'undefined') {
      this.props.onSelection(event, menuId, menuItemIndex);
    }
  }

  renderMenuItems() {
    const {
      menuId, 
      menus,
      ...others
    } = this.props;
    
    const MenuItemsTemplate = menus.map((menuItem, menuItemIndex) => {
      let mdlIcon = '';
      if (typeof menuItem.mdlIconName !== 'undefined') {
        mdlIcon = (
          <MdlIcon
            style={Object.assign({}, styles.menuItemIcon)} 
            iconName={menuItem.mdlIconName} 
          />
        );
      }      
      
      if (menuItem.disabled) {
        return (
          <li 
            key={menuItemIndex}
            style={Object.assign({}, styles.menuItem)}
            {...others}
            disabled 
            className="mdl-menu__item" 
            onClick={(e)=>this.handleMenuClick(e, menuId, menuItemIndex)}>
            {mdlIcon}
            <span style={Object.assign({}, styles.menuTextSpan)}>
              {menuItem.name}
            </span>        
          </li>
        );        
      } else {
        return (
          <li 
            key={menuItemIndex}
            style={Object.assign({}, styles.menuItem)}
            {...others}
            className="mdl-menu__item" 
            onClick={(e)=>this.handleMenuClick(e, menuId, menuItemIndex)}>
            {mdlIcon}
            <span style={Object.assign({}, styles.menuTextSpan)}>
              {menuItem.name}
            </span>          
          </li>
        );        
      }
    });
    return MenuItemsTemplate;    
  }
  
  render() {
    const {
      menuId,
      materialIcon,
      menus,
      ...others
    } = this.props;
    const MenuItemsTemplate = this.renderMenuItems();
    return (
      <div 
        {...others}
        >
        <button 
          id={menuId}
          style={Object.assign({}, styles.menuButton)}
          className="mdl-button mdl-js-button mdl-button--icon">
          <i className="material-icons">{materialIcon}</i>
        </button>
        <ul 
          className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
          style={Object.assign({}, styles.menuUl)}
          htmlFor={menuId}>
          {MenuItemsTemplate}
        </ul>
      </div>      
    );
  }  
  
}


MdlMenu.propTypes = {
  menuId        : React.PropTypes.string.isRequired,
  materialIcon  : React.PropTypes.string,
  menus         : React.PropTypes.arrayOf(
    React.PropTypes.shape({
      'name'        : React.PropTypes.string.isRequired,
      'disabled'    : React.PropTypes.bool.isRequired,
      'mdlIconName' : React.PropTypes.string
    }).isRequired
  ).isRequired,
  onSelection   : React.PropTypes.func  
};

MdlMenu.defaultProps = {
  materialIcon      : 'more_vert'
};
