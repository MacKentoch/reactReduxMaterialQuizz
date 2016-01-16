/**
* COMPONENT : MdlAppNavBar
* WHAT FOR  : material deisign lite top main navigation bar
*
* PROPS     : 
*   - title     : {string} : optional - default value = ''
*   - children  : {node} : optional - no default value 
**/

import React            from 'react';

export default class MdlAppNavBar extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    const {
      title,
      children,
      ...others
    } = this.props;
    return (
      <header className="mdl-layout__header" {...others}>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">{title}</span>
          <div className="mdl-layout-spacer"></div>
          {children}
        </div>
      </header>
    );
  }
}

MdlAppNavBar.propTypes = {
  title     : React.PropTypes.string,
  children  : React.PropTypes.node
};

MdlAppNavBar.defaultProps = {
  title      : ''
};
