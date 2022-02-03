import formStyles from '@/pages/styles/FormStyles';

const styles = (theme) => ({
    ...formStyles(theme),
    aButtonBrown: theme.mixins.aButtonBrown,
    searchIcon: {
        cursor: 'pointer'
    },
    dialogRoot: {
        minHeight: '60vh',
        padding: '2% 1%',
        position: 'absolute',
        left: 10,
        top: 90,
        ...theme.mixins.customScroll
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
    },
    wishProductImg: {
        width: '100%',
        height: 'auto',
        maxHeight: '150px',
        objectFit: 'contain'
    },
    imgContainer:{
        border: '1px solid '+theme.palette.secondary.light,
    },
    noLink:{
        textDecoration: 'none',
        '&:hover':{
            color: theme.palette.primary.dark
        }
    }
});


export default styles;
