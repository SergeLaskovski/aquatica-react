import formStyles from '@/pages/styles/FormStyles';
import loginImgFile from '@/assets/images/login.jpg';
import registerImgFile from '@/assets/images/register.jpg';


const styles = (theme) => ({
    ...formStyles(theme),
    loginImg: {
        ...theme.mixins.bgFluid,
        backgroundImage: ('url('+loginImgFile+')'),
    },
    registerImg: {
        ...theme.mixins.bgFluid,
        backgroundImage: ('url('+registerImgFile+')'),
    },
    switchSpan: {
        cursor: 'pointer',
        fontWeight: 'Bold'
    },
    aButtonBrown: {
        ...theme.mixins.aButtonBrown,
        width: '100% !important'
    },
    closeBtn: {
        position: 'absolute',
        top: ' 10px',
        right: '20px',
        fontSize: '1.6em',
        color: theme.palette.primary.main,
        "&:hover":{
          fontWeight: 'bold',
          cursor: 'pointer',
          color: theme.palette.primary.dark
        }
      },
});

export default styles;
