import {createMuiTheme} from '@material-ui/core/styles';
import '@/assets/fonts/fonts.css';

const colors = {
    primary: {main: '#3C3635', light: '#616161', dark: '#2C2C2C'},
    secondary: {main: '#B9B9B9', light: '#DEDEDE', dark: '#141414'},
    additional: {black: '#000000', white: '#FFFFFF', menuGrey: '#616161', lightgrey: '#FAFAFA', darkgrey: '#D9D9D9', error: '#ff6347', success: '#00994d'},
}

const fontFamily = '"Avenir", "Open Sans"';


const theme = createMuiTheme({
  palette: colors,
  shape: {
    borderRadius: 0,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontFamily: fontFamily,
          backgroundColor: colors.additional.white,
          fontWeight: '400',
          fontSize: '16px;',
          color: colors.additional.black,
          minHeight: '100vh',
          height: '100%',
        },
        a: {
          color: colors.primary.main,
          textDecoration: 'underline',
          "&:visited":{
            color: 'none',
            textDecoration: 'underline',
          },
          "&:hover":{
            color: colors.primary.dark,
            textDecoration: 'none',
          },
        },
        textField: {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',            
          paddingBottom: 0,
          marginTop: 0,
          fontWeight: 500
        },
        ul: {
          margin: "2px 0px",
          listStyleType: "circle",
          paddingLeft: "1em"
        }
      },
    },

  },
  typography :{
    fontFamily: fontFamily,
    h1: {
      fontWeight: '700',
      fontSize: '2.8em',
    },
    h2: {
      fontWeight: '500',
      fontSize: '2.4em',
    },
    h3: {
      fontWeight: '700',
      fontSize: '1.8em',
    },
    h4: {
      fontWeight: '700',
      fontSize: '1.2em',
    },
    subtitle1: {
      fontWeight: 'bold',
    },
    subtitle2: {
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    caption:{
      fontSize: '0.8em',
    },
    body1: {
      fontSize: '1.2em'
    },
    body2: {
      fontSize: '1.2em',
      color: colors.primary.light
    }

  },
  mixins : {
    imgFluid: {
      maxWidth: '100%',
      height: 'auto',
      objectFit: 'contain'
    },
    imgSuperFluid: {
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0
    },
    aNone: {
      textDecoration: 'none',
      color: 'none',
      "&:visited": {
        textDecoration: 'none',
        color: 'none',
      },
      "&:hover": {
        textDecoration: 'none',
        color: 'none',
      }
    },
    bgFluid:{
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }
});


const aButtonsBase = {
  fontFamily: fontFamily,
  fontWeight: 'normal',
  fontSize: '.9em',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '160px',
  height: '40px',
  lineHeight: '40px',
  borderWidth: '1px',
  borderStyle: 'solid',
  textDecoration: 'none',
  cursor: 'pointer',
  pointerEvents: 'auto',
  transition: theme.transitions.create(
    ['box-shadow', 'border-color', 'color'],
    { duration: theme.transitions.duration.complex }
  ),
  overflow: 'hidden',
  '&:hover' : {
    cursor: 'pointer',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}

const aButtonBrown = {
  ...aButtonsBase,
  borderColor: colors.primary.main,
  backgroundColor: colors.primary.main,
  color: colors.secondary.main,
  '&:visited' : {
    color: colors.secondary.main,
  },
  '&:hover' : {
    color: colors.additional.white+' !important',
    borderColor: colors.additional.white,
    boxShadow: theme.shadows[7],
  }
}

const aButtonBlack = {
  ...aButtonsBase,
  borderColor: colors.additional.black,
  backgroundColor: colors.additional.black,
  color: colors.secondary.main,
  '&:visited' : {
    color: colors.secondary.main,
  },
  '&:hover' : {
    color: colors.additional.white+' !important',
    borderColor: colors.additional.white,
    boxShadow: theme.shadows[7],
  }
}

const hoverCard = {
  height: '100%',
  width: '100%',
  position: 'relative',
  zIndex: 1,
  border: '1px solid '+theme.palette.secondary.light,
  backgroundColor: theme.palette.additional.white,
  "&:hover": {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[9],
    position: 'relative',
    zIndex: 2
  },
  transition: theme.transitions.create(
    ['box-shadow', 'transform'],
    { duration: theme.transitions.duration.short }
  ),
}

const customScroll = {
  "&::-webkit-scrollbar": {
    width: '5px'
  },
  "&::-webkit-scrollbar-track": {
      boxShadow: 'inset 0 0 5px '+theme.palette.additional.darkgrey,
      borderRadius: '2px',
  },
  "&::-webkit-scrollbar-thumb": {
      background: theme.palette.additional.darkgrey
  },
  scrollbarColor: theme.palette.secondary.main + ' ' + theme.palette.additional.darkgrey,
  scrollbarWidth: 'thin'
}


theme.mixins.customScroll = customScroll;
theme.mixins.aButtonBrown = aButtonBrown;
theme.mixins.aButtonBlack = aButtonBlack;
theme.mixins.hovercard = hoverCard;
theme.mixins.maxWidth = {
  maxWidth: '2200px',
  margin: '0 auto'
}

export default theme;
