const styles = (theme) => ({ 
    carouselBox:{
        margin: "1%",
        //border: '1px solid ' + theme.palette.secondary.light,
    },  
    imgProduct: {
        height: '500px',
        width: 'auto',
        objectFit: 'contain',
    },
    productInfoContainer:{
        padding: '5%',
    },
    infoBoxOuter: {
        backgroundColor: theme.palette.additional.lightgrey,
        padding: '1.2em',

    },
    infoBoxWrapper: {
        direction: 'rtl',
        overflow:'auto',
        height: '336px',
        width: '100%',
        ...theme.mixins.customScroll
    },
    infoBox: {
        direction: 'ltr',
        backgroundColor: theme.palette.additional.lightgrey,
        color: theme.palette.primary.light,
        padding: '0 0.6em',
        '& p':{
            lineHeight: '1.4em',
            marginTop: '-0.1em'
        }

    },
    welsImg: {
        width: '100%',
        maxWidth: '200px',
        height: 'auto',
        display: 'block',
        marginBottom: '10px'
    },
    flexGrow : {
        flexGrow: 2
    },
    bullet : {
        color: theme.palette.additional.darkgrey,
        paddingRight: '0.6em'
    },
    starGrey :{
        color: theme.palette.additional.darkgrey,
    },
    starBlack :{
        color: theme.palette.primary.main,
    },
    noUnderline : {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    },
    aButtonBlack: theme.mixins.aButtonBlack,
    justfyStart : {
        justifyContent: 'flex-start !important',
        paddingLeft: '0.8em',
    },
    popover:{
        padding: '2%',
        boxShadow: theme.shadows[7],
        maxWidth: '400px;'
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
});


export default styles;
