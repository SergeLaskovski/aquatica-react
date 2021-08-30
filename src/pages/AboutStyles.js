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
    }
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
