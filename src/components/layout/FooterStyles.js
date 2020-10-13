

const styles = (theme) => ({
    footerColumnMenu: {
        width: '40%',
        padding: '2%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    footerColumn: {
        width: '60%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    footerMenuContainer: {
        color: theme.palette.primary.light,
        fontSize: '1em'
    },
    footerHeader:{
        textTransform: 'uppercase',
        color: theme.palette.additional.black
    },
    columns: {
        columnCount: 2,
    },
    footerMenuItem:{
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    },
    footerMenuItemSelected:{
        fontWeight: 'Bold',
        pointerEvents: 'none'
    },
    webGyusContainer: {
        color: theme.palette.primary.light,
        backgroundColor: theme.palette.secondary.light,
    },
    addrItem:{
        padding: '2%'
      }
  
});

export default styles;
