const styles = (theme) => ({
    iframe : {
        height: "60vh",
        width: "100%",
        minHeight: "600px",
        ...theme.mixins.customScroll
    }
});


export default styles;
