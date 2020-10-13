import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import styles from './CatsListStyles.js';

import { CategoriesContext } from '@/context/categories-context';

import { Grid, Typography, Box } from '@material-ui/core';

import Loader from '@/components/Loader';

function CatsList(props) {

  const { classes, catsParent, catsNamesStr } = props;
  //catsParent - is an ID of category

  const catDataAll = React.useContext(CategoriesContext);
  let catData = [];
  if (catDataAll.load) {
    if (catsParent || catsParent === 0) {
      catData = catDataAll.data[catsParent];
    }
    else if (catsNamesStr) {
      let catsNamesArr = [];
      catsNamesArr = catsNamesStr.split(",");
      for (const key in catDataAll.data) {
        catsNamesArr.map(catsName => {
          catDataAll.data[key].map(categoryData => {
            if (categoryData.title === catsName) {
              catData.push(categoryData);
            }
            return true;
          })
          return true;
        })
      }
    }
  }

  const CatCard = (props) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Grid item className={classes.catItemContainer}>
        <Box component="div" className={classes.hoverCard}
          onMouseOver={() => setOpen(true)}
          onMouseOut={() => setOpen(false)}
        >

          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="stretch"
            className={classes.h100}

          >
              <NavLink to={`/products/${props.cat.slug}`} className={`${classes.decorationNone} ${catDataAll.data[props.cat.id] && classes.linkDisabled}`}>

              <Grid
                item
                className={classes.catImgContainer}
                style={{ backgroundImage: 'url("' + props.cat.img + '")' }}
              >
              </Grid>

              <Grid item className={classes.flexGrow}>
                <Box component="div" px={1} pt={1}>
                  <Typography variant="h3" component="span">{props.cat.title}</Typography>
                </Box>
              </Grid>

              </NavLink>
            {
              catDataAll.data[props.cat.id] ? (
                <Grid item container
                  justify="space-between"
                  alignItems="center"
                  wrap="nowrap"
                  className={classes.catTitleContainer}
                >
                  <Grid item>
                    <Box component="div" className={`${classes.viewAll} ${open ? classes.viewAllSelected : ''}`}>
                      <span className={classes.darker}>{props.cat.title}</span> CATEGORIES
                            </Box>
                  </Grid>
                  <Grid item className={classes.arrow} >
                    {open ? <span>&#9652;</span> : <span>&#9662;</span>}

                    <div className={`${classes.popoverContainer} ${open ? classes.popoverContainerDisplay : ''}`}>
                      {
                        catDataAll.data[props.cat.id].map((subCat, index) => (
                          <NavLink
                            to={`/${catDataAll.data[subCat.id] ? 'categories' : 'products'}/${subCat.slug}`}
                            className={classes.subCatLink}
                            key={`subcat${index}`}>
                            {subCat.title}
                          </NavLink>
                        ))
                      }
                      <Box component="div" pt={1}>
                        <NavLink to={`/products/${props.cat.slug}`} className={`${classes.subCatLink} ${classes.viewAll}`}>
                          VIEW ALL <span className={classes.darker}>{props.cat.title}</span> PRODUCTS
                                </NavLink>
                      </Box>
                    </div>

                  </Grid>
                </Grid>

              ) : (
                  <NavLink to={`/products/${props.cat.slug}`} className={classes.viewAll}>
                    <Grid item container
                      justify="space-between"
                      alignItems="center"
                      wrap="nowrap"
                      className={classes.catTitleContainer}
                    >
                      <Grid item>
                        VIEW <span className={classes.darker}>{props.cat.title}</span> PRODUCTS
                            </Grid>
                      <Grid item className={classes.arrow} >
                        <span>&#9656;</span>
                      </Grid>
                    </Grid>
                  </NavLink>

                )
            }
          </Grid>

        </Box>
      </Grid>
    )
  }

  return (

    <Grid container className={classes.catsContainer} alignItems="stretch" justify="flex-start">

      {
        (catData && catData.length > 0) ? (
          catData.map((cat, index) => (

            <CatCard cat={cat} key={`categoryCard${index}`} />

          ))
        ) : (
            <Loader />
          )
      }


    </Grid>
  )
}

export default withRouter(withStyles(styles)(CatsList));