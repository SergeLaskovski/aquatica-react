import bgMainBrochures from '@/assets/images/bg-main-brochures.jpg'


const styles = (theme) => ({
  carouselContainer: {
    position: 'relative',
  },
  topHeader: {
    position: 'absolute',
    top: '0%',
    left: '0%',
    zIndex: 2,
    width: '100%',
    height: '200px',
    [theme.breakpoints.up('sm')]: {
      height: '200px',
      padding: '0 10%',
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 20%',
      height: '400px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 30%',
      height: '650px',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    textShadow: '1px 1px 3px #999999;',
    color: theme.palette.additional.white,
  },
  topText: {
    marginTop: '2em',
    fontSize: '1.4em'
  },
  topTextMobile: {
    backgroundColor: theme.palette.primary.main,
    marginLeft: 'auto', 
    marginRight: 'auto',
    padding: '5%',
    textAlign: 'center',
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
      padding: "0 5% 5% 5%",
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
  scrollChevron:{
    cursor: "pointer",
    fontSize: '3em',
    color: theme.palette.primary.main,
    '&:hover':{
      color: theme.palette.secondary.main
    }
  },
  arrowDisabledClass:{
    visibility: 'hidden'
  },
  imgSuperFluid:{
    ...theme.mixins.imgSuperFluid
  }

});

export default styles;
