const styles = (theme) => ({    
    breadcrumbContainer: {
        flexGrow: 1,
        backgroundColor: theme.palette.additional.black,
        fontWeight: 100,
        fontSize: '0.9em',
        padding: '2px',
      },
    breadcrumbLink: {
        display: 'block',
        fontSize: '0.8em',
        padding: '2px 5px 2px 5px',
        borderRight: '1px solid' +theme.palette.secondary.light,
        color: theme.palette.secondary.light,
        textDecoration: 'none',
        textTransform: 'uppercase',
        "&:hover": {
        color: theme.palette.additional.white,
        textDecoration: 'underline',
    }
  },
  breadcrumbCurrent: {
    display: 'block',
    padding: '2px 5px 2px 5px',
    fontSize: '0.8em',
    fontWeight: '700',
    color: theme.palette.additional.white,
    textDecoration: 'none',
    textTransform: 'uppercase',
  }

});

export default styles;
