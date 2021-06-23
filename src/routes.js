import React, {useContext} from 'react';

import {Route, Switch} from 'react-router-dom';
import {NavigationContext} from '@/context/navigation-context';

import Loader from '@/components/Loader';
import Error from '@/components/Error';
import Page from '@/pages/Page';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Categories from '@/pages/Categories';
import Collections from '@/pages/Collections';
import Support from '@/pages/Support';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import Retailers from '@/pages/Retailers';
import Vacancies from '@/pages/Vacancies';
import Inspiration from '@/pages/Inspiration';
import News from '@/pages/News';
import EcoOptions from '@/pages/EcoOptions';
import FactoryShop from '@/pages/FactoryShop';
import Tips from '@/pages/Tips';
import Wishlist from '@/pages/Wishlist';
import Comparelist from '@/pages/Comparelist';
import Testimonials from '@/pages/Testimonials';


function MainRoutes() {
  const components = {
    Page: Page,
    Home: Home,
    Products: Products,
    Categories: Categories,
    Collections: Collections,
    Support: Support,
    Contact: Contact,
    About: About,
    Retailers: Retailers,
    Vacancies: Vacancies,
    Inspiration: Inspiration,
    News: News,
    EcoOptions: EcoOptions,
    FactoryShop: FactoryShop,
    Tips: Tips,
    Wishlist: Wishlist,
    Comparelist: Comparelist,
    Testimonials: Testimonials
  };

  const {navContext} = useContext(NavigationContext);

  const FormRouter = (navData) => {
    
    const chooseComponent = (route, index) => {

      //special components
      switch(route.path) {
        
        case "/support":
          return (
            <Route key={index} path={`${route.path}`} component={components['Support']} />
          )
        case "/categories":
          return (
            <Route key={index} path={`${route.path}/:cat?`} component={components['Categories']} />
          )
        case "/products":
          return (
            <Route key={index} path={`${route.path}/:cat?/:product?`} component={components['Products']} />
          )
        case "/collections":
          return (
            <Route key={index} path={`${route.path}/:col?/:product?`} component={components['Collections']} />
          )
        case "/contact-us":
          return (
            <Route key={index} path={`${route.path}`} component={components['Contact']} />
          )
        case "/about-us":
          return (
            <Route key={index} path={`${route.path}`} component={components['About']} />
          )
        case "/retailers":
          return (
            <Route key={index} path={`${route.path}`} component={components['Retailers']} />
          )
        case "/vacancies":
          return (
            <Route key={index} path={`${route.path}`} component={components['Vacancies']} />
          )
        case "/inspiration":
          return (
            <Route key={index} path={`${route.path}`} component={components['Inspiration']} />
          )
        case "/news":
          return (
            <Route key={index} path={`${route.path}/:postSlug?`} component={components['News']} />
          )
        case "/eco-options":
          return (
            <Route key={index} path={`${route.path}/:postSlug?`} component={components['EcoOptions']} />
          )
        case "/factory-shop":
          return (
            <Route key={index} path={`${route.path}/:product?`} component={components['FactoryShop']} />
          )
        case "/tips-videos":
          return (
            <Route key={index} path={`${route.path}/:postSlug?`} component={components['Tips']} />
          )
        case "/testimonials":
          return (
            <Route key={index} path={`${route.path}`} component={components['Testimonials']} />
          )
        default:
          return (
            <Route exact key={index} path={`${route.path}`} component={components[route.component]} />
          )
      }
    }

    //additional paths, that are not defined in WP Main Menu
    //route.push({path: 'Categories',component: 'categories'});
    let updatedNavData = [];
    updatedNavData = [...navData];
    updatedNavData.push({path: '/categories', component: 'Categories', title: 'Categories'});
    updatedNavData.push({path: '/wishlist', component: 'Wishlist', title: 'Wishlist'});
    updatedNavData.push({path: '/comparelist', component: 'Comparelist', title: 'Comparelist'});

    return updatedNavData.map((route, index) => (
      
      chooseComponent(route, index)
    ));
  };

  return navContext.error ? <Error /> : navContext.load ? <Switch>{FormRouter(navContext.data)}</Switch> : <Loader />;

}

export default MainRoutes;
