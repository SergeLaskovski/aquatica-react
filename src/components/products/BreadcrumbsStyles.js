const styles = (theme) => ({    
  breadcrumbContainer: {
      flexGrow: 1,
      backgroundColor: theme.palette.additional.black,
      fontWeight: 100,
      fontSize: '13px',
      padding: '2px',
  },
  breadcrumbLink: {
      whiteSpace: 'nowrap',
      display: 'block',
      fontSize: '1em',
      padding: '2px 18px',
      borderRight: '1px solid' +theme.palette.secondary.light,
      color: theme.palette.secondary.light,
      textDecoration: 'none',
      textTransform: 'uppercase',
      "&:hover": {
        color: theme.palette.additional.white,
        textDecoration: 'underline',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: '11px',
      }
  },
  breadcrumbCurrent: {
    display: 'block',
    padding: '2px 18px',
    fontSize: '1em',
    fontWeight: '500',
    color: theme.palette.additional.white,
    textDecoration: 'none',
    textTransform: 'uppercase',
    [theme.breakpoints.down('md')]: {
      fontSize: '11px',
    }
  }

});

export default styles;
