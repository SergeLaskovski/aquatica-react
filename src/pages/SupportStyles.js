import pageStyles from './styles/PageStyles';
import formStyles from './styles/FormStyles';


const styles = (theme) => ({
  ...pageStyles(theme),
  ...formStyles(theme),
  aButtonBrown: theme.mixins.aButtonBrown,

});


export default styles;
