import pageStyles from './styles/PageStyles';
import formStyles from './styles/FormStyles';


const styles = (theme) => ({
  ...pageStyles(theme),
  ...formStyles(theme),
  aButtonBrown: theme.mixins.aButtonBrown,
  addrItem:{
    padding: '5%'
  },
  contactFormContainer:{
    width: '60%',
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
        width: '95%',
    }
  }

});


export default styles;
