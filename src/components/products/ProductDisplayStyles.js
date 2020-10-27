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
        "&::-webkit-scrollbar": {
            width: '5px'
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: 'inset 0 0 5px '+theme.palette.additional.darkgrey,
            borderRadius: '2px',
            //background: theme.palette.additional.light 
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.palette.additional.darkgrey
          },
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
    }
});


export default styles;
