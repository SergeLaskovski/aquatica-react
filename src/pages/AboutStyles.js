import pageStyles from './styles/PageStyles';


const styles = (theme) => ({
  ...pageStyles(theme),
  carouselContainer: {
    position: 'relative',
    minHeight: '200px'
  },
  cardRoot: {
    width: '350px',
    height: '100%',
    cursor: 'pointer'
  },
  cardMedia: {
    height: 350,
  },
  teamCardsContainer: {
    '& .flippy-front, .flippy-back':{
      boxShadow: 'none !important'
    }
  }

});


export default styles;
