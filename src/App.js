import React from 'react';

//theme & CSS
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';

//Header, Nav, Footer
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

//Router
import {BrowserRouter as Router} from 'react-router-dom';
import MainRoutes from './routes';

//Hook to scroll page to top
import ScrollToTop from '@/hooks/ScrollTop';


import {NavigationContextProvider} from '@/context/navigation-context';
import {CategoriesContextProvider} from '@/context/categories-context';
import {CollectionsContextProvider} from '@/context/collections-context';
import {UserContextProvider} from '@/context/user-context';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContextProvider>
      <NavigationContextProvider>
      <CategoriesContextProvider>
      <CollectionsContextProvider>
        <Router>
            <ScrollToTop />
            <Header />
            <MainRoutes />
            <Footer />
        </Router>
      </CollectionsContextProvider>
      </CategoriesContextProvider>
      </NavigationContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
