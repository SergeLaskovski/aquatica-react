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
  aNone: theme.mixins.aNone,
  productItmeContainer: {
    backgroundColor: theme.palette.additional.white,
  },
  hoverCard: theme.mixins.hovercard,
  h100:{
    height: '100%'
  },
  catImgContainer:{
    ...theme.mixins.bgFluid,
    width: '100%',
    height: '250px',
    maxHeight: '250px',
    overflow: 'hidden',
  },
  flexGrow: {
      flexGrow: 1,
  },

  popoverContainer:{
    visibility: 'hidden',
    position: 'absolute',
    zIndex: 2,
    top: '100%',
    left: 0,
    opacity: '0%',
    width: 'calc(100% + 2px)',
    marginLeft: '-1px',
    backgroundColor: theme.palette.additional.white,
    border: '1px solid' +  theme.palette.secondary.light,
    boxShadow: theme.shadows[9],
    borderTop: 'none',
    transition: theme.transitions.create(
      ['opacity'],
      { duration: theme.transitions.duration.complex }
    ),
  },
  popoverContainerDisplay:{
    visibility: 'visible',
    opacity: '100%',
  },
  arrow: {
    fontSize: '1.2em'
  },
  catTitleContainer: {
    padding: '3%',
    "&:hover":{
      cursor: 'pointer',
    }
  },
  viewAll: {
    display: 'block',
    fontSize: '12px !important',
    lineHeight: '16px',
    paddingTop: '0.6em',
    paddingBottom: '0.6em',
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    textTransform: 'uppercase',
    "&:hover": {
      textDecoration: 'none',
      color: theme.palette.additional.black,
    }
  },
  viewAllSelected:{
    textDecoration: 'none',
    color: theme.palette.additional.black,
  },
  darker: {
    fontWeight: 700,
  },
  subCatLink: {
    display: 'block',
    textDecoration: 'none',
    fontSize: '0.9em',
    padding: '0 3%',
    "&:hover": {
      textDecoration: 'none',
      backgroundColor: theme.palette.secondary.light,
    }
  },
  linkDisabled:{
    pointerEvents: 'none',
  },
  decorationNone:{
    textDecoration: 'none',
  }

});

export default styles;
