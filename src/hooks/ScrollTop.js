import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history }) {
  useEffect(() => {
    setTimeout(function(){
      window.scrollTo(0, 0);
    }, 300);

  }, [history.location.pathname]);

  return (null);
}

export default withRouter(ScrollToTop);