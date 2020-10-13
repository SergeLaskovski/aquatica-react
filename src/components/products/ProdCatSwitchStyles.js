const styles = (theme) => ({    
    switchContainer:{
      padding: '0',
      margin: '0',
      boxShadow: theme.shadows[3]
  
    },
    switchBox:{
      width: '100%',
      height: '100%',
      paddingTop: "10px",
      textAlign: 'center',
      textDecoration: 'none',
      textTransform: 'uppercase',
      backgroundColor: theme.palette.secondary.light,
      "&:hover":{
        backgroundColor: theme.palette.secondary.main,
      },
      "&::after": {
        display:'block',
        content: '""',
        marginTop: '7px',
        borderBottom: '2px solid '+theme.palette.primary.main,
        transform: 'scaleX(0)',
        transformOrigin: '0% 0%',
        transition: 'transform 250ms ease-in-out'
      },
      "&:hover::after": {
        marginTop: '7px',
        transform: 'scaleX(1)',
        transformorigin:  '100% 50%'
      }
    },
    switchBoxSelected:{
      fontWeight: 'Bold',
      "&::after": {
        display:'block',
        content: '""',
        marginTop: '7px',
        borderBottom: '2px solid '+theme.palette.primary.main,
        transform: 'scaleX(1)',
      }
    },
    navLinkSelected:{
      pointerEvents: 'none',
    },
    aNone: theme.mixins.aNone,
   
  });
  
  export default styles;
  
