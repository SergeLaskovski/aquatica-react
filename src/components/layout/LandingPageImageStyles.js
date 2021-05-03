

const styles = (theme) => ({
    topContainer: {
        position: 'relative'
    },
    imgFluid:{
        width: '100%'
    },
    imgContainer:{
        display: 'inline-block',
        width: '500px',
        height: '250px',
        [theme.breakpoints.up('md')]: {
            width: '800px',
            height: '400px',
        },
        [theme.breakpoints.up('lg')]: {
            width: '1000px',
            height: '500px',
        },
        [theme.breakpoints.up('xl')]: {
            width: '1200px',
            height: '600px',
        },
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: '3em'
    },
    imgContainerNarrow : {
        height: '150px !important',
    },
    h1:{
        position: 'absolute',
        bottom: '2em',
        right: '60px',
        textShadow: '0px 0px 3px white'
    }
    
  
});

export default styles;
