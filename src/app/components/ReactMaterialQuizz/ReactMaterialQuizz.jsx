import React 		                from 'react';
import MdlLayoutContainer       from '../mdl/MdlLayoutContainer.jsx!jsx';
import MdlAppNavBar             from '../mdl/MdlAppNavBar.jsx!jsx';
import MdlDrawer                from '../mdl/MdlDrawer.jsx!jsx';
import MdlMain                  from '../mdl/MdlMain.jsx!jsx';
import MdlMenu                  from '../mdl/MdlMenu.jsx!jsx';
import FlatButton               from 'material-ui/lib/flat-button';
import Dialog                   from 'material-ui/lib/dialog';
import RadioButton              from 'material-ui/lib/radio-button';
import RadioButtonGroup         from 'material-ui/lib/radio-button-group';
import Snackbar                 from 'material-ui/lib/snackbar';
import ThemeManager             from 'material-ui/lib/styles/theme-manager';
import MyRawTheme               from '../../shared/quizRawTheme.jsx!jsx';
import {styles}                 from './ReactMaterialQuizz.style.jsx!jsx';
import navigationModel          from '../../models/navigationModel.json!json';
import appNavBarMenuModel       from '../../models/appBarMenuModel.json!json';
import localEN                  from '../../i18n/local_en.json!json';
import localFR                  from '../../i18n/local_fr.json!json';
import DevTools                 from '../DevTools/DevTools.jsx!jsx';

const HEADER_TITLE  = 'ReactMaterialQuizz';
const GITHUB_LINK   = 'https://github.com/MacKentoch/reactMaterialQuizz';

export default class ReactMaterialQuizz extends React.Component {
  
  // in pure ES6 go end class definition or in ES6+ you can use static :
  // You could even use ES7 decorator see : material-ui/lib/styles/theme-decorator
  //  static childContextTypes = {
  //    muiTheme: React.PropTypes.object,
  //    language: React.PropTypes.string 
  //  }
  
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    const navigatorLanguage = (navigator.language || navigator.browserLanguage).split('-')[0] || 'en'; // en is fallback language
    
    this.state = {
      language                : navigatorLanguage,
      translate               : this.getTranslations(navigatorLanguage), 
      navigationList          : navigationModel,
      appNavBarMenuList       : appNavBarMenuModel,
      langDialogOpened        : false,
      snakBarAutoHideDuration : 2000,
      snackbarOpened          : false,
      snackbarMessage         : '',
      snackbarAction          : ''  
    };
  }
 
  getChildContext() {
    return {
      muiTheme        : ThemeManager.getMuiTheme(MyRawTheme),
      language        : this.state.language,
      translate       : this.state.translate,
      displaySnackBar : (message, action)=>this.showSnackbar(message, action)
    };
  }  
  
  getTranslations(currentLanguage) {
    let translation = Object.assign({}, localEN); // fallback language is En
    if (currentLanguage === 'en') {
      translation = Object.assign({}, localEN);
    }
    if (currentLanguage === 'fr') {
      translation = Object.assign({}, localFR);
    }
    return translation;
  }
  
  navigationTo(event, selectedRoute) {
    // more info on react router v1.0.0+ : http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    this.props.history.pushState(null, selectedRoute);       
  } 
  
  openLanguageDialog() {
    this.setState({
      langDialogOpened  : true,
      snackbarOpened    : false
    });     
  } 
  
  closeLanguageDialog() {
    this.setState({
      langDialogOpened: false,
      snackbarOpened  : false
    });    
  }
  
  handleDrawerNavigation(event, selectedRoute) {
    this.navigationTo(event, selectedRoute);
  } 
  
  handleMenuItemSelected(menuKey) {
    if (menuKey === 0) {
      this.openLanguageDialog();
    }
    if (menuKey === 1) {
      location.href = GITHUB_LINK;
    }
  }
  
  handleCloseLanguageDialog() {
    this.closeLanguageDialog();
  }  
  
  handleLanguageSelect(event, selected) {
    this.setState({
      language        : selected,
      snackbarOpened  : true,
      snackbarMessage : `${this.getTranslations(selected).SNACKBAR_CHANGE_LANG_MSG} ${selected}`,
      snackbarAction  : `${this.getTranslations(selected).CLOSE_WORD}`,       
      translate       : this.getTranslations(selected)             
    });
  } 
  
  showSnackbar(message = '', action= '') {
    this.setState({
      snackbarOpened  : true,
      snackbarMessage : message,
      snackbarAction  : action      
    });
  }
  
  handleSnackbarRequestClose() {
    this.setState({
      snackbarOpened  : false
    });
  } 
  
  renderLanguageDialog() {
    let customActions = [
      <FlatButton
        label={this.state.translate.CANCEL_WORD}
        secondary={false}
        onTouchTap={()=>this.handleCloseLanguageDialog()} />,
      <FlatButton
        label={this.state.translate.CLOSE_WORD}
        primary={false}
        onTouchTap={()=>this.handleCloseLanguageDialog()} />
    ];    
    return (
      <Dialog
        title={this.state.translate.CHOOSE_LANGUAGE}
        actions={customActions}
        width={'300px'}
        open={this.state.langDialogOpened}
        onRequestClose={()=>this.handleCloseLanguageDialog()}>
        <RadioButtonGroup 
          name="languageSelection" 
          defaultSelected={this.state.language}
          onChange={(event, selected)=>this.handleLanguageSelect(event, selected)}>
        <RadioButton
          value="en"
          label={this.state.translate.ANGLAIS_WORD} 
          style={{marginBottom:16}} />
        <RadioButton
          value="fr"
          label={this.state.translate.FRANCAIS_WORD}
          style={{marginBottom:16}}/>
        </RadioButtonGroup>        
      </Dialog>    
    );    
  }
  
  render() { 
    const { pathname }  = this.props.location;
    const navigation    = this.state.navigationList.map((navItem) => {
      return {
        label       : this.state.translate[navItem.translate_id],
        mdlIconName : navItem.mdlIconName,
        route       : navItem.route 
      };
    });
    const menuItems   = this.state.appNavBarMenuList.map((menuItem) => {
      return {
        name        : this.state.translate[menuItem.translate_id],
        disabled    : menuItem.disabled,
        mdlIconName : menuItem.mdlIconName
      };
    }); 
    const LanguageDialog = this.renderLanguageDialog();
    return (
      <MdlLayoutContainer>        
        <MdlAppNavBar>
          <MdlMenu 
            menuId={'topMainMenu'}
            menus={menuItems}
            onSelection={(event, menuId, menuItemIndex)=>this.handleMenuItemSelected(menuItemIndex)}
          />
        </MdlAppNavBar>
        <MdlDrawer 
          title={HEADER_TITLE}
          titleFontSize={18}
          navigation={navigation}
          closeOnNavigation={true}
          onSelection={(event, navigationItemLabel, route)=>this.handleDrawerNavigation(event, route)}
        />
        <MdlMain style={Object.assign({}, styles.app)}>
          {React.cloneElement(this.props.children, { key: pathname })}                           
        </MdlMain>                                     
        {LanguageDialog}
        <Snackbar
          open={this.state.snackbarOpened}
          message={this.state.snackbarMessage}
          action={this.state.snackbarAction}
          autoHideDuration={1500}
          onRequestClose={()=>this.handleSnackbarRequestClose()}
        />        
        <DevTools />
      </MdlLayoutContainer>

    );
  }

}

ReactMaterialQuizz.propTypes = {
  children  : React.PropTypes.node,
  history   : React.PropTypes.object,
  location  : React.PropTypes.object
};

ReactMaterialQuizz.childContextTypes = {
  muiTheme        : React.PropTypes.object,
  language        : React.PropTypes.string,
  translate       : React.PropTypes.object,
  displaySnackBar : React.PropTypes.func
};
