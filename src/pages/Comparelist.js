import React from 'react';
import axios from 'axios';
import {NavLink, withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core';
import styles from './ComparelistStyles.js';
import {Grid, Typography, Box} from '@material-ui/core';

import {UserContext} from '@/context/user-context';
import {ComparelistContext} from '@/context/comparelist-num-context';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import FooterContactBanner from '@/components/layout/FooterContactBanner';
import {CollectionsContext} from '@/context/collections-context';

import AddToWish from '@/components/layout/AddToWish';

function Comparelist(props) {

    const {classes} = props;

    const {loggedUser} = React.useContext(UserContext);


    const COMPARELIST_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCTS + "?comparelist="+loggedUser;
    const comparelistData = UseDataApi(COMPARELIST_API_URL);


    const ComparelistItems = (compareProps) => {

        let {updateCompareNum} = React.useContext(ComparelistContext);

        const [comparelistDisplay, setComparelistDisplay] = React.useState(compareProps.comparelistData);

        const removeCompareHandler = (event,compareItem) =>{

            event.preventDefault();
            event.stopPropagation();
    
            if(loggedUser){
                const COMPARELIST_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_COMPARELIST + "?username="+loggedUser+"&remove="+compareItem;
                let newComparelistDisplay = [];
                               
                 axios
                     .get(COMPARELIST_API_URL)
                     .then((res) => {
                         comparelistDisplay.map((searchProduct) => {
                             if(searchProduct.code !== compareItem){
                                 newComparelistDisplay.push(searchProduct);
                             }
                            return true;
                         })
                         updateCompareNum(-1);
                         setComparelistDisplay(newComparelistDisplay);
                     })
                     .catch((err) => {
                         console.log(err.message);
                     });
            }
        }

       
        const CompareFields = [
            ["Product","title"],
            ["Image","img"],
            //["Description","short"],
            ["Price","price"],
            ["Pressure","pressure"],
            ["Shape","shape"],
            ["Availability","stockStatus"],
            ["WELS rating","wels"],
            ["Cartridge/Mechanism","cartridge"],
            ["Collection","range"],
            ["Action","code"]
        ];

        const drawStars = (stars=0) =>{
            let starsArr = [];
            for( let i=1; i<7; i++ ){
              starsArr.push( (i<=stars) ? true : false);
            }
            return (
              <React.Fragment>
                {
                starsArr.map((starItem, index) => (
                  <span key={`star${index}`} className={starItem ? classes.starBlack : classes.starGrey}>&#9733;</span>
                ))
                }
              </React.Fragment>
            )
        }
        
        const colsData = React.useContext(CollectionsContext);

        const getCollectionSlug = (colName) => {
            let colsObj = {};
            colsObj = colsData.data;
            let currentColSlug = '';
            for (let key in colsObj) {
              if (colsObj.hasOwnProperty(key)) {
                  // eslint-disable-next-line
                  colsObj[key].forEach((item)=>{
                    if(item.title === colName){  currentColSlug =  item.slug }
                  })
              }
            }
            return currentColSlug;
        }

        const FieldCell = (fieldCellProps) => {
            const fieldData = fieldCellProps.fieldData;
            const slug = fieldCellProps.fieldData.slug;
            const catSlug = fieldCellProps.fieldData.catslug;
            if(fieldData.data){
                switch (fieldData.title) {
                    case 'Product' :
                        return (<NavLink to={`/products/${catSlug}/${slug}`}><Typography variant="h4">{ fieldData.data }</Typography></NavLink>);
                    case 'Image' :
                        return (<img src={fieldData.data} alt='Aquatica product' className={classes.compareProductImg}/>);
                    case 'Collection' :
                        return(
                            <NavLink to={`/collections/${getCollectionSlug(fieldData.data)}`}>{fieldData.data}</NavLink>
                        )
                    case 'WELS rating' :
                        return (
                            <Grid container>
                                <Grid item>
                                    { fieldData.data.mains>0 && (
                                        <div>
                                        Mains Pressure&nbsp;
                                        </div>
                                        )
                                    }
                                    {fieldData.data.low>0 && (
                                        <div>
                                        Low Pressure&nbsp;
                                        </div>
                                        )
                                    }
                                    </Grid>
                                    <Grid item>
                                    { fieldData.data.mains>0 && (
                                        <div>
                                            {drawStars(fieldData.data.mains)}
                                        </div>
                                        )
                                    }
                                    { fieldData.data.low>0 && (
                                        <div>
                                            {drawStars(fieldData.data.low)}
                                        </div>
                                        )
                                    }
                                </Grid>
                            </Grid>
                        );
                    case 'Action' : 
                        return (
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                <div><AddToWish productCode={fieldData.data} productTitle=''/></div>
                                <div>&nbsp;</div>
                                <div><a href="/#" onClick={(event)=>removeCompareHandler(event,fieldData.data)}>Remove</a></div>
                            </Box>
                        );
                    default:
                        return (
                            <span dangerouslySetInnerHTML={{__html: fieldData.data}}/>
                        )
                }
            }
            else return ''
        }


        return (
            <div className={classes.compareContainer}>
                {
                    comparelistDisplay.length>0 ? 
                        CompareFields.map((field,index) => (
                            <div className={classes.compareRow} key={`compareRow${index}`}>
                                {
                                    field[0] === 'Action' ? (
                                        <div className={`${classes.compareTitles} ${classes.compareCell} ${classes.compareCellEmpty}`}>
                                            &nbsp;
                                        </div>
                                    ) : (
                                        <div className={`${classes.compareTitles} ${classes.compareCell}`}>
                                            {field[0]}
                                        </div>
                                    )
                                }
                                {
                                    comparelistDisplay.map((compareFields,index) => (
                                        <Grid item className={`${classes.compareCell} ${field[0] === 'Action' && classes.compareCellAction}`} key={`compareCell${index}`}>
                                            <FieldCell fieldData={{"title":field[0],"data":compareFields[field[1]],'catSlug':compareFields['catSlug'],'slug':compareFields['slug']}}/>
                                        </Grid>
                                    ))
                                }
                            </div>
                        ))
                    : (
                        <h3>Your list is empty</h3>
                    )
                }
            </div>
        )
    }


    return(
        <React.Fragment>
            <Box px={8} py={4}>
                <Typography variant="h1">Product Comparison</Typography>
            </Box>
            <Box className={classes.outerContainer}>
                {
                    loggedUser ? 
                    comparelistData.error ? (
                            <Error />
                        ) : comparelistData.load && comparelistData.data ? (
                            <ComparelistItems comparelistData={comparelistData.data}/>
                        ) : (
                            <Loader />
                        )
                    :
                    (<Box p={6} fontWeight="Bold">Please login to view this page</Box>)
                }
            </Box>
            <Box p={6}/>
            <FooterContactBanner/>
        </React.Fragment>
    )

}


export default withRouter(withStyles(styles)(Comparelist));
