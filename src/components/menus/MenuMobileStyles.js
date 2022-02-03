
const styles = (theme) => ({
    menuContainer: {
      flexGrow: 1,
      width: '100%',
      position: 'fixed',
      zIndex: 10,
      top: 0,
      left: 0,
      boxShadow: theme.shadows[3]
    },
    whiteNavContainer: {
      flexGrow: 1,
      backgroundColor: theme.palette.additional.white,
      fontWeight: 100,
      fontSize: '15px',
      height: '80px',
    },
    whiteNavLink: {
      display: 'inline-block',
      paddingRight: '10px',
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
    mobileMenuPlaceholder: {
      height: '80px',
    },
    mobileMenuContainer:{
      height: '100%',
      width: '100%',
      zIndex: '8',
      backgroundColor: theme.palette.additional.white,
      padding: '10px',
      position: 'fixed',
      top: '80px',
      left: 0,
      overflowY: "auto",
      ...theme.mixins.customScroll
    },
    mobileNavLink: {
      display: 'block',
      textTransform: 'Uppercase',
      textAlign: 'right',
      paddingRight: '14px',
      fontSize: '1.6em',
      textDecoration: 'none',
      color: theme.palette.primary.dark,
      "&:hover": {
        color: theme.palette.primary.light,
      },
    },
    megamenu:{
      position: 'fixed',
      top: '80px',
      left: 0,
      zIndex: '9',
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.additional.white,
      minHeight: '560px',
    },
    navLinkDisabled: {
      pointerEvents: 'none'
    },
    logo:{
      width: '160px',
      marginLeft: '15px'
    }
});

export default styles;
