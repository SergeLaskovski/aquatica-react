import React from 'react';

import {withStyles} from '@material-ui/core';
import styles from './FactoryShopStyles.js';
import { Box, Typography} from '@material-ui/core';

//import ProducstList from '@/components/products/ProductsList';
import FooterContactBanner from '@/components/layout/FooterContactBanner';

function EcoOptions(props) {

    /*const {classes} = props;

    const IFrameComponent = (props) => {
        return (
              <Box dangerouslySetInnerHTML={{ __html: props.iframe }} />
          );
    }

    const iframe = '<iframe src="http://aquatica.localhost.com/cms/cart/" width="100%" frameBorder="0"></iframe>';
    <IFrameComponent iframe={iframe} />
    */
    return(
        <React.Fragment>
            <Box p={8}><Typography variant="h1">No items available at the moment</Typography></Box>
        <Box p={6}/>
        <FooterContactBanner/>
        </React.Fragment>
    )

}


export default withStyles(styles)(EcoOptions);
