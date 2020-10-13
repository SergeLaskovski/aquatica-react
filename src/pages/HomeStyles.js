import bgMainBrochures from '@/assets/images/bg-main-brochures.jpg'


const styles = (theme) => ({
  carouselContainer: {
    position: 'relative',
  },
  topHeader: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%', 
    zIndex: 2,
    marginLeft: 'auto', 
    marginRight: 'auto',
    padding: '0 15%',
    textAlign: 'center',
    textShadow: '2px 2px 4px #111111;',
    color: theme.palette.additional.white,
    [theme.breakpoints.up('sm')]: {
      top: '15%',
      padding: '0 5%',
    },
  },
  topText: {
    fontSize: '1.2em'
  },
  topTextMobile: {
    backgroundColor: theme.palette.primary.main,
    marginLeft: 'auto', 
    marginRight: 'auto',
    padding: '5%',
    textAlign: 'center',
    textShadow: '2px 2px 4px #111111;',
    color: theme.palette.additional.white,
    fontSize: '1.1em'
  },
  rangeProducts:{
    padding: "5% 10%",
  },
  rangeProductsText:{
    alignItems: "center",
    justifyContent: "flex-start",
    [theme.breakpoints.down('sm')]: {
      justifyContent: "center",
      padding: "5%",
    },
  },
  rangeProductsButton:{
    alignItems: "center",
    justifyContent: "flex-end",
    [theme.breakpoints.down('sm')]: {
      justifyContent: "center",
      padding: "5%",
    },
  },
  aButtonBrown: theme.mixins.aButtonBrown,
  catsContainer:{
    padding: '6px',
    margin: '0'
  },
  catItemContainer:{
    padding: '6px',
    width: '20%',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    }
  },
  imgFluid: {
    ...theme.mixins.imgFluid,
  },
  aNone: theme.mixins.aNone,
  productItmeContainer: {
    backgroundColor: theme.palette.additional.white,
  },
  hoverCard: theme.mixins.hovercard,
  h100:{
    height: '100%'
  },
  wooImgContainer: theme.mixins.wooImgContainer,
  brochuresRoot:{
    ...theme.mixins.bgFluid,
    backgroundPosition: 'top center',
    backgroundImage: 'url("'+bgMainBrochures+'")',
    color: theme.palette.additional.white,
    marginTop: '5%',
    padding: "10% 10% 0 10%",
  },
  brochuresHeaderContainer: {
    paddingBottom: "10%",
  },
  brochureRootContainer:{
    height: '60px',
    paddingTop: '2%',
    transition: theme.transitions.create(
      ['padding-top'],
      { duration: theme.transitions.duration.short }
    ),
    "&:hover":{
      paddingTop: '0',
      cursor: 'pointer',
    }
  },
  brochureContainer:{
    width: '100%',
    height: '100%',
    padding: '5px',
    color: theme.palette.additional.white,
    [theme.breakpoints.down('sm')]: {
      borderTop: '2px solid '+theme.palette.secondary.light
    },
    [theme.breakpoints.up('md')]: {
      borderLeft: '2px solid '+theme.palette.secondary.light,

    },
    "& div": {
      fontWeight: '700',
    },
    "& span": {
      transition: theme.transitions.create(
        ['color'],
        { duration: theme.transitions.duration.short }
      ),
      color: 'transparent',
    },
    "&:hover span":{
      color: theme.palette.secondary.light,
    },  
  },
  quote1: {
    padding: '5%',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.additional.white,
    fontSize: '1.2em',
    verticalAlign: 'middle'
  },
  quote2: {
    padding: '5%',
    fontSize: '1.1em',
    verticalAlign: 'middle'
  },

});

export default styles;
