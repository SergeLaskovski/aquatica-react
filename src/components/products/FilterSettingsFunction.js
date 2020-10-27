
export const defaultFilter = {
    colour: [],
    shape: [],
    pressure: [],
    size: [],
    //style: [],
};

export const FilterSettingsFunction = (productsData = []) => {


    let renderFilters = [];

    /*form filter*/
        /*filters settings*/
            let filters = {
                colours: {},
                shapes: {},
                sizes: {},
                pressures: {},
                //styles: {},
            };
            let colours = [];
            let shapes = [];
            let sizes = [];
            let pressures = [];
            //let styles = [];

            //select all available from products array
            productsData.map((productItem) => {
                
                colours = productItem.colour.split(',');
                colours.map((colour) => {
                    if( colour !== "N/A" ){ return (filters.colours[colour] = true); }
                    return false;
                });

                shapes = productItem.shape.split(',');
                shapes.map((shape) => {
                    if( shape !== "N/A" ){ return (filters.shapes[shape] = true); }
                    return false;
                });

                sizes = productItem.size.split(',');
                sizes.map((size) => {
                    if( size !== "N/A" && size !=='Unknown' && size !=='' ){ return (filters.sizes[size] = true); }
                    return false;
                });
                
                /*
                styles = productItem.style.split(',');
                styles.map((style) => {
                    if( style !== "N/A" && style !=='' ){ return (filters.styles[style] = true); }
                    return false;
                });
                */

                pressures = productItem.pressure.split(',');
                pressures.map((pressure) => {
                    if( pressure !== "N/A" && pressure !== "" && pressure !== "Unknown"){ 
                        if(pressure !== 'Mains Pressure Only'){ pressure = 'Low and Unequal Pressure' }
                        return (filters.pressures[pressure] = true);
                    }
                    return false;
                });

                return filters;
            });

            //add availabale colours to renderFilters array (to render the filters on the page)
            if (filters.colours) {
                let name = 'Colour';
                let fieldName = 'colour';
                let coloursRange = [];
                for (let [key] of Object.entries(filters.colours)) {
                    if (filters.colours.hasOwnProperty(key)) {
                        coloursRange.push(key);
                    }
                }
                if( coloursRange.length>0 ){
                    renderFilters.push({ name: name, fieldName: fieldName, range: coloursRange });
                }
            }
        /*end colour filter settings*/

        /*shape filter settings*/
             //add availabale shapes to renderFilters array (to render the filters on the page)
            if (filters.shapes) {
                let name = 'Shape';
                let fieldName = 'shape';
                let shapesRange = [];
                for (let [key] of Object.entries(filters.shapes)) {
                    if (filters.shapes.hasOwnProperty(key)) {
                        shapesRange.push(key);
                    }
                }
                if( shapesRange.length>0 ){
                    renderFilters.push({ name: name, fieldName: fieldName, range: shapesRange });
                }
            }
        /*end shape filter settings*/

        /*sizes filter settings*/
             //add availabale shapes to renderFilters array (to render the filters on the page)
             if (filters.sizes) {
                let name = 'Size';
                let fieldName = 'size';
                let sizesRange = [];
                for (let [key] of Object.entries(filters.sizes)) {
                    if (filters.sizes.hasOwnProperty(key)) {
                        sizesRange.push(key);
                    }
                }
                if( sizesRange.length>0 ){
                    renderFilters.push({ name: name, fieldName: fieldName, range: sizesRange });
                }
            }
        /*end sizes filter settings*/

        /*styles filter settings
             //add availabale shapes to renderFilters array (to render the filters on the page)
             if (filters.styles) {
                let name = 'Style';
                let fieldName = 'style';
                let stylesRange = [];
                for (let [key] of Object.entries(filters.styles)) {
                    if (filters.styles.hasOwnProperty(key)) {
                        stylesRange.push(key);
                    }
                }
                if( stylesRange.length>0 ){
                    renderFilters.push({ name: name, fieldName: fieldName, range: stylesRange });
                }
            }
        end styles filter settings*/

        /*pressure filter settings*/
             //add availabale pressures to renderFilters array (to render the filters on the page)
             if (filters.pressures) {
                let name = 'Pressure';
                let fieldName = 'pressure';
                let pressuresRange = [];
                for (let [key] of Object.entries(filters.pressures)) {
                    if (filters.pressures.hasOwnProperty(key)) {
                             pressuresRange.push(key);
                    }
                }
                if( pressuresRange.length>0 ){
                    renderFilters.push({ name: name, fieldName: fieldName, range: pressuresRange });
                }
            }
        /*end shape filter settings*/
        

        /*end form filter*/

        return renderFilters;
}


export const applyFilter = (filterArr = {}, productsData = []) => {

    let filteredData = [];
    let productsArr = [];
    let searchWhere = '';
    let searchWhat = '';
    let newFilteredData = [];
    let filtersCount = 0;
    let _isAddedToFilter = [];
    let searchResult = false;
    //lop through all filter types (colour, size etc)
    for (let [filterType, filterArgs=[]] of Object.entries(filterArr)) {
        productsArr = (filteredData.length > 0) ? [...filteredData] : [...productsData];
        searchWhere = filterType;
        searchWhat = '';
        newFilteredData = [];
        _isAddedToFilter = [];
        if(typeof(filterArgs[0]) !== 'undefined'){
            filtersCount++;
            //loop through all filter args (if type is colour, loop through all selected colours)
            // eslint-disable-next-line 
            filterArgs.map((filterArg) => {
                searchWhat = filterArg;
                productsArr.map((productItem) => {
                    searchResult = false;
                    //custom conditions for pressure search
                    if(searchWhere === 'pressure' && searchWhat === "Low and Unequal Pressure"){
                        if(productItem[searchWhere] !== 'Mains Pressure Only'){
                            searchResult = true;
                        }
                    }
                    else if (productItem[searchWhere].search(searchWhat) > -1) {
                        searchResult = true;
                    }
                    if(searchResult) {
                        if(!_isAddedToFilter[productItem.prodID]){
                            newFilteredData.push(productItem);
                        }
                        _isAddedToFilter[productItem.prodID] = true;
                    }
                    return true;
                })
                return true;
            })
            filteredData = [...newFilteredData];
        }
    }
    //if no filters were applied return full list of products
    if( filtersCount === 0 ){ return false }
    else{ return filteredData }
    
};