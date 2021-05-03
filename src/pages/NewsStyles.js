import pageStyles from './styles/PageStyles';
import formStyles from './styles/FormStyles';


const styles = (theme) => ({
  ...pageStyles(theme),
  ...formStyles(theme),
  catsContainer:{
    padding: '6px',
    margin: '0',

  },
  catItemContainer:{
    padding: '6px',
    width: '20%',

    [theme.breakpoints.down('md')]: {
      width: '33.3%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    }
  },
  aNone: theme.mixins.aNone,
  productItmeContainer: {
    backgroundColor: theme.palette.additional.white,
  },
  hoverCard: theme.mixins.hovercard,
  h100:{
    height: '100%'
  },
  productImgContainer:{
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '200px',
    maxHeight: '200px',
    overflow: 'hidden',

  },
  arrow:{
    fontSize: '12px !important',
    lineHeight: '16px',
    paddingTop: '0.6em',
    paddingBottom: '0.6em',
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    textTransform: 'uppercase',
    cursor: 'pointer',
    "&:hover": {
      textDecoration: 'none',
      color: theme.palette.additional.black,
    },
    
  },
  aButtonBrown: theme.mixins.aButtonBrown,
  newsHeaders:{
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      borderBottom: 'none',
    },
    display: 'flex',
    alignItems: 'center',
    borderBottom: "1px solid "+theme.palette.additional.menuGrey,
    margin: "0 4em",
  },
  newsHeader:{
    padding: '1em',
    color: theme.palette.primary.dark,
    cursor: 'pointer',
    fontSize: '1.6em',
    '&:hover':{
      color: theme.palette.additional.black,
    }
  },
  newsHeaderSelected:{
    fontWeight: 'bold',
    color: theme.palette.additional.black,
    cursor: 'initial',
    borderBottom: "4px solid "+theme.palette.additional.menuGrey,
  }
});


export default styles;
