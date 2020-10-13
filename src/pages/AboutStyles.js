import pageStyles from './styles/PageStyles';


const styles = (theme) => ({
  ...pageStyles(theme),
  cardRoot: {
    width: '350px',
    height: '100%',
    cursor: 'pointer'
  },
  cardMedia: {
    height: 350,
  },
  teamCardsContainer: {
    padding: '5%',
    '& .flippy-front, .flippy-back':{
      boxShadow: 'none !important'
    }
  }

});


export default styles;
