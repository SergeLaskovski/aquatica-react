import React, {useState, useEffect} from 'react';

import {withStyles} from '@material-ui/core';

import LogoPlain from '@/assets/images/aquatica-logo-plain.png';
import LogoText from '@/assets/images/aquatica-logo-text.png';
import styles from './ChangingLogoStyles';


function ChangingLogo(props) {

    const {classes} = props;

    const logosArr = [LogoPlain,LogoText]
    const [showLogo, setShowLogo] = useState(0);

    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLogo(showLogo === 1 ? 0 : 1);
        }, 10000);
        return () => {
            clearTimeout(timeout);
          };
    }, [showLogo]);
    


    return (
        <img src={logosArr[showLogo]} width={props.imgWidth} height={props.imgHeight} className={classes.imgFluid} alt="Aquatica logo"/>
    )
}

export default withStyles(styles)(ChangingLogo);
