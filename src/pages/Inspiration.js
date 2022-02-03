import React, { useState, useCallback } from 'react';

import { Box} from '@material-ui/core';

import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";


import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';


function Inspiration(props) {

    //const {classes} = props;

    const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '/?page=inspiration';
    const pageData = UseDataApi(PAGE_API_URL);

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
      }, []);
    
    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const customStyles = {
        container: (base, state) => ({
          ...base,
          height: '100vh',
        }),
        view: () => ({
            height: 'calc(100vh - 10px)',
            '& > img': {
                maxHeight: 'calc(100vh - 20px)',
            },
            alignItems: 'center',
            display: 'flex ',
            justifyContent: 'center',
        })
      }
      
    
    return(
        <React.Fragment>
        {
            pageData.error ? (
              <Error />
            ) : pageData.load ? (
                <Box p={{xs: 1, lg: 6 }}>
                    <Gallery photos={pageData.data} direction={"column"} margin={4} onClick={openLightbox} />
                    <ModalGateway>
                        {viewerIsOpen ? (
                        <Modal onClose={closeLightbox}>
                            <Carousel
                                currentIndex={currentImage}
                                views={pageData.data.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                                styles={customStyles}
                            />
                        </Modal>
                        ) : null}
                    </ModalGateway>
                </Box>
            ) : (
              <Loader />
            )
        }
        
        <Box p={6}/>
        </React.Fragment>
    )

}


//export default withStyles(styles)(Inspiration);
export default Inspiration;