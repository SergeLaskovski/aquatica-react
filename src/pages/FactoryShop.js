import React from 'react';

import {withStyles} from '@material-ui/core';
import styles from './FactoryShopStyles.js';
import { Box} from '@material-ui/core';

//import ProducstList from '@/components/products/ProductsList';
import FooterContactBanner from '@/components/layout/FooterContactBanner';

function EcoOptions(props) {

    //const {classes} = props;

    const IFrameComponent = (props) => {
        return (
              <Box dangerouslySetInnerHTML={{ __html: props.iframe }} />
          );
    }

    const iframe = '<iframe src="http://aquatica.localhost.com/cms/cart/" width="100%" frameBorder="0"></iframe>';

    return(
        <React.Fragment>
        <IFrameComponent iframe={iframe} />,
        <Box p={6}/>
        <FooterContactBanner/>
        </React.Fragment>
    )

}


export default withStyles(styles)(EcoOptions);
