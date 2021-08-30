

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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
    },
    selectEmpty: {
        
    },
    textFieldFileInput : {
        paddingLeft: '30px'
  
    },
});

export default formStyles;