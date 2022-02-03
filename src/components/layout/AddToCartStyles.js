const styles = (theme) => ({ 
    noUnderline : {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    },
    aButtonBlack: theme.mixins.aButtonBlack,
    justfyStart : {
        justifyContent: 'flex-start !important',
        paddingLeft: '0.8em',
    },
    popover:{
        padding: '2%',
        boxShadow: theme.shadows[7],
        maxWidth: '400px;'
    },
    disables: {
        pointerEvents: 'none'
    }

});


export default styles;

