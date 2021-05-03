
const styles = (theme) => ({
    topMenuPlaceholder:{
      height: '90px'
    },
    menuContainer: {
      flexGrow: 1,
      width: '100%',
      position: 'fixed',
      zIndex: 10,
      top: 0,
      left: 0,
      boxShadow: theme.shadows[3],
    },
    topNavContainer: {
      flexGrow: 1,
      backgroundColor: theme.palette.additional.black,
      fontWeight: 100,
      fontSize: '1em',
      height: '30px',
      paddingRight: '25px'
    },
    topNavLink: {
      display: 'block',
      paddingLeft: '3%',
      color: theme.palette.additional.white,
      textDecoration: 'none',
      "&:hover": {
        color: theme.palette.additional.white,
        textDecoration: 'underline',
        cursor: 'pointer'
      }
    },
    topNavLinkSelected: {
      fontWeight: 'bold',
      cursor: 'default',
      "&:hover": {
        textDecoration: 'none',
      }
    },
    navLinkDisabled: {
      pointerEvents: 'none'
    },
    whiteNavContainer: {
      flexGrow: 1,
      backgroundColor: theme.palette.additional.white,
      fontWeight: 100,
      fontSize: '15px',
      height: '60px',
    },
    whiteNavItemsContainer : {
      flexGrow: 1,
      marginRight: '25px'
    },
    whiteNavLink: {
      display: 'inline-block',
      paddingRight: '6%',
      [theme.breakpoints.down('lg')]: {
        paddingRight: '4%',
      },
      [theme.breakpoints.down('md')]: {
        paddingRight: '2%',
      },
      textTransform: 'uppercase',
      color: theme.palette.additional.black,
      textDecoration: 'none',
      "&::after": {
        display:'block',
        content: '""',
        marginTop: '5px',
        borderBottom: '2px solid '+theme.palette.primary.main,
        transform: 'scaleX(0)',
        transformOrigin: '0% 0%',
        transition: 'transform 250ms ease-in-out'
      },
      "&:hover::after": {
        marginTop: '5px',
        transform: 'scaleX(1)',
        transformorigin:  '100% 50%'
      }
    },
    whiteNavLinkSelected: {
      fontWeight: 'bold',
      cursor: 'default',
      "&:hover": {
        textDecoration: 'none',
      },
      "&::after": {
        display:'block',
        content: '""',
        marginTop: '5px',
        borderBottom: '2px solid transparent',
      },
      "&:hover::after": {
        borderBottom: '2px solid transparent',
      }
    },
    megamenu:{
      width: '100%',
      backgroundColor: theme.palette.additional.white,
      height: '75vh',
      minHeight: '390px',
      boxShadow: theme.shadows[3],
      zIndex: '-1',
      position: 'fixed',
      top: '80px',
      left: 0
    },
    cursorPointer: {
      cursor: 'pointer'
    },
    menuPaper:{
      backgroundColor:  theme.palette.additional.black,
      fontSize: '12px !important',
      color: theme.palette.additional.white
    }
});

export default styles;
