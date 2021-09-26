const styles = (theme) => ({    

  h100:{
    height: '100%'
  },
  
  flexGrow: {
      flexGrow: 1,
  },
  filtersMainContainer:{
    backgroundColor: theme.palette.additional.white,
    marginTop: '8px',
    padding: '0 2%',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      top: 140,
      left: 0,
      zIndex: 3,
      boxShadow: theme.shadows[3],
    }
  },
  displayNone : {
    display: 'none',
  },
  filtersContainer:{
    width: "100%",
    padding: "10px 0",
    fontSize: '0.9em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    }
  },
  Checkbox: {
    height: '14px',
    width: '14px',
    [theme.breakpoints.down('sm')]: {
      height: '20px',
      width: '20px'
    }
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
  results:{
    fontSize: '10px !important',
    lineHeight: '16px',
    paddingTop: '0.6em',
    paddingBottom: '0.6em',
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    textTransform: 'uppercase',
   },
   popoverContainer:{
    pointerEvents: "none"
  },
  popoverContent:{
    boxShadow: theme.shadows[7],
    maxWidth: '400px;',
    pointerEvents: "auto"
  },
  closeBtn: {
      position: 'absolute',
      top: ' 10px',
      right: '20px',
      fontSize: '1.6em',
      color: theme.palette.primary.main,
      "&:hover":{
      fontWeight: 'bold',
      cursor: 'pointer',
      color: theme.palette.primary.dark
      }
  }
});

export default styles;
