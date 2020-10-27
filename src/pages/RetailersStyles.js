import pageStyles from './styles/PageStyles';
import formStyles from './styles/FormStyles';


const styles = (theme) => ({
  ...pageStyles(theme),
  ...formStyles(theme),
  mapContainer: {
    width: '100%',
    height: '450px',
  }

});


export default styles;
