import React from 'react';

//theme & CSS
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';

//Header, Nav, Footer
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

//Router
import {BrowserRouter as Router} from 'react-router-dom';
import MainRoutes from './routes';

//Hook to scroll page to top
import ScrollToTop from '@/hooks/ScrollTop';

import {UserContextProvider} from '@/context/user-context';
import {NavigationContextProvider} from '@/context/navigation-context';
import {CategoriesContextProvider} from '@/context/categories-context';
import {CollectionsContextProvider} from '@/context/collections-context';
import {WishlistContextProvider} from '@/context/wishlist-num-context';
import {ComparelistContextProvider} from '@/context/comparelist-num-context';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContextProvider>
      <NavigationContextProvider>
      <CategoriesContextProvider>
      <CollectionsContextProvider>
      <WishlistContextProvider>
      <ComparelistContextProvider>
        <Router>
            <ScrollToTop />
            <div style={{maxWidth: '2200px', margin: '0 auto'}}>
            <Navigation />
            <MainRoutes />
            <Footer />
            </div>
        </Router>
      </ComparelistContextProvider>
      </WishlistContextProvider>
      </CollectionsContextProvider>
      </CategoriesContextProvider>
      </NavigationContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
