
const styles = (theme) => ({
  loginContainer: {
    display: 'block',
    paddingLeft: '3%',
    color: theme.palette.additional.white,
    textDecoration: 'none',
    "&:hover": {
      color: theme.palette.additional.white,
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  dialogRoot: {
    padding: '0 !important',
  },

});

export default styles;
