import { FC, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import Footer from '../src/components/Footer/Footer';
import Header from '../src/components/Header/Header';
import Aboutus from '../src/Pages/Aboutus/Aboutus';
import Career from '../src/Pages/Career/Career';
import Home from '../src/Pages/Home/Home';
import Listing from '../src/Pages/Listing/Listing';
import './App.css';
import Investment from '../src/Pages/Investment/Investment';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: FC = () => {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Aboutus" component={Aboutus} />
        <Route path="/Career" component={Career} />
        <Route path="/Listing/:id" component={Listing} />
        <Route path="/Investment" component={Investment} />
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
