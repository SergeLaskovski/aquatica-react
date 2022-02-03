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
    cursor: 'pointer',
    overflowY: 'auto',
    ...theme.mixins.customScroll
  },
  cardRootMobile: {
    width: '90%',
    margin: '0px auto'
  },
  cardMedia: {
    height: '350px',
  },
  cardMediaMobile: {
    height: '500px',
  },
  teamCardsContainer: {
    '& .flippy-front, .flippy-back':{
      boxShadow: 'none !important'
    }
  }

});


export default styles;
