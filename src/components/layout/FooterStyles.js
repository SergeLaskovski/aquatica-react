

const styles = (theme) => ({
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
        padding: '0 2%'
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
    footerColumn:{
        padding: '2%',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
    }
  
});

export default styles;
