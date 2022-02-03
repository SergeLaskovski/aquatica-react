const styles = (theme) => ({ 
    cartMenu: {
        position: "fixed",
        zIndex: '10',
        right: 0,
        top: "80px",
        backgroundColor: theme.palette.additional.white,
        boxShadow: theme.shadows[3],
        [theme.breakpoints.up('md')]: {
            top: "120px",
        }
    }

});


export default styles;

