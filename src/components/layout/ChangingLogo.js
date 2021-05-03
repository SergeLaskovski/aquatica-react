import React, {useEffect} from 'react';

import {withStyles} from '@material-ui/core';
import {Box} from '@material-ui/core';

import LogoPlain from '@/assets/images/aquatica-logo-plain.png';
import LogoText from '@/assets/images/aquatica-logo-text.png';
import styles from './ChangingLogoStyles';
import Fade from '@material-ui/core/Fade';


function ChangingLogo(props) {

    const {classes} = props;

    let logo1 = LogoPlain;
    let logo2 = LogoText;

    if(props.logo1 && props.logo2){
        logo1 = props.logo1;
        logo2 = props.logo2;
    }

    const logosArr = [logo1,logo2]
    //const [showLogo, setShowLogo] = useState(0);
    const [inOut, setInOut] = React.useState(true);

    
    useEffect(() => {
        const timeout = setTimeout(() => {
            //setShowLogo(showLogo === 1 ? 0 : 1);
            setInOut(!inOut);
        }, 5000);
        return () => {
            clearTimeout(timeout);
          };
    }, [inOut]);
    


    return (
        <Box className={classes.imgContainer}>
            <Fade in={inOut} timeout={1000}>
                <img src={logosArr[0]} width={props.imgWidth} height={props.imgHeight} className={classes.imgFluid} alt="Aquatica logo"/>
            </Fade>
            <Fade in={!inOut}  timeout={1000}>
                <img src={logosArr[1]} width={props.imgWidth} height={props.imgHeight} className={classes.imgFluid} alt="Aquatica logo"/>
            </Fade>
        </Box>
        )
}

export default withStyles(styles)(ChangingLogo);
