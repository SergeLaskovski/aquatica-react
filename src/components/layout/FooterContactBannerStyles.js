import bgFooterContact from '@/assets/images/bg-footer-contact.jpg'

const styles = (theme) => ({
  
  footerContact: {
    ...theme.mixins.bgFluid,
    backgroundImage: 'url("'+bgFooterContact+'")',
    color: theme.palette.additional.white,
    padding: "6% 1% 5% 1%"
  },
  aButtonBrown: theme.mixins.aButtonBrown,

});

export default styles;
