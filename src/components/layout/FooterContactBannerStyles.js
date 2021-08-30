
const styles = (theme) => ({
  
  footerContact: {
    ...theme.mixins.bgFluid,
    color: theme.palette.additional.white,
    padding: "6% 1% 5% 1%",
    [theme.breakpoints.down('md')]: {
      padding: "12% 2% 10% 2%",
    },
  },
  aButtonBrown: theme.mixins.aButtonBrown,

});

export default styles;
