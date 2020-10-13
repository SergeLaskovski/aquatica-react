

const formStyles = (theme) => ({
    textFieldRoot:{
    },
    textFieldInput: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.main,
        borderRadius: 0,
  
    },
    notchedOutline: { borderColor: theme.palette.secondary.light },
    errorMsg: {
        color: theme.palette.additional.error,
        fontWeight: '700'
    },
    sentMsg: {
        color: theme.palette.additional.success,
        fontWeight: '700'
    }
});

export default formStyles;