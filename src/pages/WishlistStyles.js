import pageStyles from './styles/PageStyles';


const styles = (theme) => ({
  ...pageStyles(theme),
  aButtonBrown: theme.mixins.aButtonBrown,
  wishProductImg: {
    width: '100%',
    height: 'auto',
    maxHeight: '300px',
    objectFit: 'contain'
  },
  imgContainer:{
    border: '1px solid '+theme.palette.secondary.light,
  },
  removeLinkContainer: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      paddingBottom: '4%'
    },
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
    }
  }

});


export default styles;
