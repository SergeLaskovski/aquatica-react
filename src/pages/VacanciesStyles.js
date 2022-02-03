import pageStyles from './styles/PageStyles';
import formStyles from './styles/FormStyles';


const styles = (theme) => ({
  ...pageStyles(theme),
  ...formStyles(theme),
  aButtonBrown: theme.mixins.aButtonBrown,
  cardRoot: {
    width: '450px',
    height: '450px',
    cursor: 'pointer',
    overflowY: 'auto',
    ...theme.mixins.customScroll
  },
  cardRootMobile: {
    width: '95%',
    margin: '0 auto'
  },
  teamCardsContainer: {
    padding: '5%',
    '& .flippy-front, .flippy-back':{
      boxShadow: 'none !important'
    }
  }  
});


export default styles;
