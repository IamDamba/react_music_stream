// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import React from "react";
import Header from "../pages/layouts/Header";
import Footer from "../pages/layouts/Footer";
import Player from "../pages/layouts/Player";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/views/home/Home";
import About from "../pages/views/about/About";
import Terms from "../pages/views/terms/Terms";
import Privacy from "../pages/views/privacy/Privacy";
import Licences from "../pages/views/licences/Licences";
import Contact from "../pages/views/contact/Contact";
import Newsletter from "../pages/views/newsletter/Newsletter";
import AllTracks from "../pages/views/tracks/AllTracks";
import SingleTrack from "../pages/views/tracks/SingleTrack";
import Cart from "../pages/views/cart/Cart";

// ||||||||||||||||||||||| App |||||||||||||||||||||||||

const App = () => {
  return (
    <Router>
      <Header />
      <Player />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/tracks" component={AllTracks} />
        <Route exact path="/track/detail/:track_id" component={SingleTrack} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/newsletter" component={Newsletter} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/licences" component={Licences} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
