

const styles = (theme) => ({
  root :{
    height: '100%',
    position: 'relative',
  },
  mmContainer:{
    height: '100%',
    paddingTop: '40px',
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: '5px'
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: 'inset 0 0 5px '+theme.palette.secondary.dark,
      borderRadius: '2px',
      background: theme.palette.additional.light 
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.secondary.dark
    },
  },
  imgBG: {
    //height: '100%',
    //backgroundImage: 'url("'+imgMM+'")',
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    transition: theme.transitions.create(
      ['background-image'],
      { duration: theme.transitions.duration.complex }
    ),
  },
  mmColumn: {
    width: '20%',
    padding: '1em'
  },
  topLvlItem: {
    fontWeight: 'bold',
    paddingBottom: '8px',
    textDecoration: 'none',
    "&:hover":{
      color: theme.palette.additional.black,
      textShadow: '1px 1px 2px '+theme.palette.secondary.main,
    }
  },
  mmItem: {
    display: 'block',
    fontSize: '14px',
    lineHeight: '16px',
    paddingTop: '0.2em',
    paddingBottom: '0.2em',
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    "&:hover": {
      cursor: 'pointer',
      textDecoration: 'none',
      color: theme.palette.additional.black,
      textShadow: '1px 1px 2px '+theme.palette.secondary.main,
    },
    "&:hover span":{
      borderRadius: '50%',
      boxShadow: theme.shadows[3],
      cursor: 'pointer',
    },
  },
  arrowContainer: {
    "&:hover span":{
      borderRadius: '50%',
      boxShadow: theme.shadows[3],
      cursor: 'pointer',
    },
  },
  arrow: {
    display: 'flex',
    margin: '0 0 0 auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '1px',
    paddingLeft: '1px',
    width: '20px',
    height: '20px',
    fontSize: '1.2em',
    padding: 'auto',
  },
  mmSubContainer: {
    padding: '0.3em 0 0.6em 1em',
  },
  mmViewAll: {
    display: 'block',
    fontSize: '12px',
    lineHeight: '16px',
    paddingTop: '0.6em',
    paddingBottom: '0.6em',
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    textTransform: 'uppercase',
    borderTop: '1px solid'+theme.palette.secondary.light,
    //borderBottom: '1px solid'+theme.palette.secondary.light,
    "&:hover": {
      textDecoration: 'none',
      color: theme.palette.additional.black,
    }
  },
  darker: {
    //color: theme.palette.additional.black,
    fontWeight: 700,
  },
  flexGrow: {
    flexGrow: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: '-10px',
    right: '20px',
    fontSize: '1.6em',
    color: theme.palette.primary.main,
    "&:hover":{
      fontWeight: 'bold',
      cursor: 'pointer',
      color: theme.palette.primary.dark
    }
  },
  allCollections: {
    float: 'right',
    marginRight: '10%',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color:  theme.palette.primary.dark,
    fontWeight: 'bold',
    "&:hover" :{
      color: theme.palette.primary.main,
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  },
  columns: {
    columnCount: 2,
  }
});

export default styles;
