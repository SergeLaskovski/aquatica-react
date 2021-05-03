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
    "&::-webkit-scrollbar": {
      width: '7px'
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: 'inset 0 0 7px '+theme.palette.additional.darkgrey,
      borderRadius: '2px',
      //background: theme.palette.additional.light 
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.additional.darkgrey
    },
  },
  teamCardsContainer: {
    padding: '5%',
    '& .flippy-front, .flippy-back':{
      boxShadow: 'none !important'
    }
  }  
});


export default styles;
