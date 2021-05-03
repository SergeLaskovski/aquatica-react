import pageStyles from './styles/PageStyles';

const styles = (theme) => ({

    ...pageStyles(theme),
    
    catsContainer:{
        padding: '6px',
        margin: '0',
    
      },
      catItemContainer:{
        padding: '6px',
        width: '20%',
    
        [theme.breakpoints.down('md')]: {
          width: '33.3%',
        },
        [theme.breakpoints.down('sm')]: {
          width: '50%',
        }
      },
      aNone: theme.mixins.aNone,
      productItmeContainer: {
        backgroundColor: theme.palette.additional.white,
      },
      hoverCard: theme.mixins.hovercard,
      h100:{
        height: '100%'
      },
      productImgContainer:{
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        width: '100%',
        height: '200px',
        maxHeight: '200px',
        overflow: 'hidden',
    
      },
      flexGrow: {
          flexGrow: 1,
      },
    
});

export default styles;