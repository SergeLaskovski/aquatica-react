

const styles = (theme) => ({
  mmContainer:{
    width: '100%',
    height: '100%',
    padding: '24px 10px 24px 0px',
    overflowY: "auto",
    backgroundColor: theme.palette.additional.white,
    "&::-webkit-scrollbar": {
      width: '5px'
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: 'inset 0 0 5px '+theme.palette.secondary.dark,
      borderRadius: '2px',
      background: theme.palette.additional.light 
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.secondary.dark
    },
  },
  topLvlItem: {
    fontWeight: 'bold',
    paddingBottom: '8px',
    textAlign: 'right',
    fontSize: '1.4em',
    textTransform: 'uppercase',
    cursor: 'pointer'
  },
  subItems:{
    paddingRight: '2em'
  },
  mmItem: {
    display: 'block',
    textAlign: 'right',
    fontSize: '1.4em',
    lineHeight: '1.4em',
    paddingTop: '0.2em',
    paddingBottom: '0.2em',
    color: theme.palette.additional.menuGrey,
    textDecoration: 'none',
    "&:hover": {
      textDecoration: 'none',
      color: theme.palette.additional.black,
    }
  },
  arrow: {
    fontSize: '1.2em'
  },
  mmSubContainer: {
    padding: '1em 2em 1em 0em',
    textAlign: 'right',
  },
  mmViewAll: {
    display: 'block',
    textAlign: 'right',
    fontSize: '1.1em',
    paddingTop: '10px',
    paddingBottom: '10px',
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    "&:hover": {
      textDecoration: 'none',
      color: theme.palette.additional.black,
    }
  },
  backButton: {
    padding: "20px 0",
  }
});

export default styles;
