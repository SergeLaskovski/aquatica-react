

const styles = (theme) => ({
    imgFluid: {
        maxWidth: '100%',
        height: 'auto',
    },
    imgContainer: {
        display: 'inline-box',
        position: 'relative',
        '& img:nth-child(2)': {
            position: 'absolute',
            top: 0,
            left: 0
        }
    }
});


export default styles;
