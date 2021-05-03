
const styles = (theme) => ({  
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
  fullWidthContiner:{
    padding: '6px',
    whiteSpace: 'normal',
    height: '350px',
    width: '350px'
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
    backgroundSize: 'contain',
    width: '100%',
    height: '200px',
    maxHeight: '200px',
    overflow: 'hidden',

  },
  flexGrow: {
      flexGrow: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    display: 'inline-block',
    fontSize: '2em',
    fontWeight: 'light',
    color: theme.palette.primary.main,
    "&:hover":{
    fontWeight: 'bold',
    cursor: 'pointer',
    color: theme.palette.primary.dark
    }
  },
  popoverContainer:{
    pointerEvents: "none"
  },
  popoverContent:{
    boxShadow: theme.shadows[7],
    maxWidth: '400px;',
    pointerEvents: "auto"
  },
  starGrey :{
    color: theme.palette.additional.darkgrey,
  },
  starBlack :{
      color: theme.palette.primary.main,
  },
});

export default styles;
