const styles = (theme) => ({ 
    carouselBox:{
        margin: "1%",
        border: '1px solid ' + theme.palette.secondary.light,
    },  
    imgProduct: {
        height: '500px',
        width: 'auto',
        objectFit: 'contain',
    },
    productInfoContainer:{
        padding: '5%',
    },
    infoBox: {
        backgroundColor: theme.palette.additional.lightgrey,
        color: theme.palette.primary.light,
        padding: '2%',
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
    }
});

export default styles;
