import React, {useContext} from 'react';
import UseDataApi from '@/hooks/UseDataApi';
import {NavigationContext} from '@/context/navigation-context';

import Loader from '@/components/Loader';
import Error from '@/components/Error';

function Page() {
  const {navContext} = useContext(NavigationContext);
  const currentPageID = navContext.current;
  const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PAGES + '/' + currentPageID;

  const pageData = UseDataApi(PAGE_API_URL);

  return (
    <React.Fragment>
    {
    pageData.error ? (
        <Error />
        ) : pageData.load ? (
          <React.Fragment>
            <div dangerouslySetInnerHTML={{__html: pageData.data.content.rendered}} />
          </React.Fragment>
        ) : (
          <Loader />
      )
    }

    </React.Fragment>
  )
}

export default Page;
