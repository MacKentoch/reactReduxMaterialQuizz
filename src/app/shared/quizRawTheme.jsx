import Colors           from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing          from 'material-ui/lib/styles/spacing';


export default {
  spacing     : Spacing,
  fontFamily  : 'Roboto, sans-serif',
  zIndex      : {
    layer   : 20,
    popover : 20
  },
  palette     : {
    primary1Color     : Colors.blue800,
    primary2Color     : Colors.blue700,
    primary3Color     : Colors.grey400,
    accent1Color      : Colors.redA200,
    accent2Color      : Colors.grey100,
    accent3Color      : Colors.grey500,
    textColor         : Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor       : Colors.white,
    borderColor       : Colors.grey300,
    disabledColor     : ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor : Colors.blue500,
    clockCircleColor  : ColorManipulator.fade(Colors.darkBlack, 0.07)
  }
};
