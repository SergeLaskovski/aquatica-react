import pageStyles from './styles/PageStyles';


const styles = (theme) => ({
  ...pageStyles(theme),
  columns: {
    columnCount: 1,
    [theme.breakpoints.up('md')]: {
      columnCount: 2,
    },
    fontSize: '1.2em'
  },
  avoidBrake:{
    breakInside: 'avoid-column'
  },
  cellBlack:{
    backgroundColor: theme.pae
  }

});


export default styles;
