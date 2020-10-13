import {createMuiTheme} from '@material-ui/core/styles';
import '@/assets/fonts/fonts.css';

const colors = {
    primary: {main: '#3C3635', light: '#616161', dark: '#2C2C2C'},
    secondary: {main: '#B9B9B9', light: '#DEDEDE', dark: '#141414'},
    additional: {black: '#000000', white: '#FFFFFF', menuGrey: '#616161', lightgrey: '#FAFAFA', error: '#ff6347', success: '#00994d'},
}

const fontFamily = '"Avenir", "Open Sans"';


const theme = createMuiTheme({
  palette: colors,
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontFamily: fontFamily,
          backgroundColor: colors.additional.white,
          fontWeight: '400',
          fontSize: '14px;',
          color: colors.additional.black,
          height: '100vh',
          minHeight: '550px',
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
      fontSize: '2.2em',
    },
    h3: {
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
    body1: {
      fontSize: '1.2em'
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
      height: 'auto',
      objectFit: 'contain'
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
  display: 'inline-block',
  textAlign: 'center',
  minWidth: '160px',
  height: '40px',
  lineHeight: '40px',
  borderWidth: '1px',
  borderStyle: 'solid',
  textDecoration: 'none',
  cursor: 'pointer',
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



theme.mixins.aButtonBrown = aButtonBrown;
theme.mixins.hovercard = hoverCard;

export default theme;
