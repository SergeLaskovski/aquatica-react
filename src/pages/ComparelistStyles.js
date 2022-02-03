import pageStyles from './styles/PageStyles';


const styles = (theme) => ({
  ...pageStyles(theme),
  aButtonBrown: theme.mixins.aButtonBrown,
  compareProductImg: {
    width: '100%',
    height: 'auto',
    maxHeight: '300px',
    objectFit: 'contain'
  },
  imgContainer:{
    border: '1px solid '+theme.palette.secondary.light,
  },
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '3em'
  },
  compareContainer:{
    display: 'block',
    ...theme.mixins.customScroll
  },
  compareRow: {
    display: 'flex'
  },
  compareTitles: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.additional.white,
    padding: '3em',
    borderBottom: '1px solid ' + theme.palette.additional.lightgrey,
    fontWeight: 'bold',
    width: '300px',
    minWidth: '300px'
  },
  compareCell: {
    width: '270px',
    minWidth: '270px',
    padding: '1em',
    borderRight: '1px solid ' + theme.palette.additional.darkgrey,
    borderTop: '1px solid ' + theme.palette.additional.darkgrey,
    whiteSpace: 'wrap'
  },
  compareCellEmpty: {
    border: '1px solid transparent',
    backgroundColor: 'transparent',
    borderRight: '1px solid ' + theme.palette.additional.darkgrey,
  },
  compareCellAction: {
    borderBottom: '1px solid ' + theme.palette.additional.darkgrey,
  },
  starGrey :{
    color: theme.palette.additional.darkgrey,
  },
  starBlack :{
      color: theme.palette.primary.main,
  },
});


export default styles;
