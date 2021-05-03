import pageStyles from './styles/PageStyles';


const styles = (theme) => ({
  ...pageStyles(theme),
  aButtonBrown: theme.mixins.aButtonBrown,
  
  aNoneBox: {
    textDecoration: 'none',
    '&:hover':{
      color: theme.palette.additional.black,
      '& div':{
        backgroundColor: theme.palette.additional.darkgrey + ' !important'
      }
    }
  },
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
    backgroundSize: 'contain',
    width: '100%',
    height: '300px',
    maxHeight: '300px',
    overflow: 'hidden',

  },
  flexGrow: {
      flexGrow: 1,
  },
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
  disabled:{
    pointerEvents : 'none'
  },
  imgHoverFluid: {
    ...theme.mixins.imgSuperFluid,
  }
});


export default styles;
