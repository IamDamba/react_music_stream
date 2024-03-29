// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import React, { useEffect, useState } from "react";
import Header from "../pages/layouts/Header";
import Footer from "../pages/layouts/Footer";
import Player from "../pages/layouts/Player";
import Toast from "../pages/layouts/Toast";
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
import Error404 from "../pages/views/error404/Error404";
import Profile from "../pages/views/profile/Profile";
import CheckoutSuccess from "../pages/views/checkout/CheckoutSuccess";
import NewsletterDeleteSuccess from "../pages/views/newsletter/NewsletterDeleteSuccess.jsx";
import NewsletterDeleteCancel from "../pages/views/newsletter/NewsletterDeleteCancel.jsx";
import AdBlockModal from "../pages/layouts/AdBlockModal.jsx";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetTokenToReducer } from "../reducer/slices/userSlice";
import { useDetectAdBlock } from "adblock-detect-react";

// ||||||||||||||||||||||| App |||||||||||||||||||||||||

const App = () => {
  //hooks
  const adBlockDetected = useDetectAdBlock();

  // Redux
  const { token, tokenDuration } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  // Functions
  useEffect(() => {
    if (tokenDuration !== null) {
      const interval = setInterval(() => {
        if (tokenDuration < Date.now()) {
          dispatch(resetTokenToReducer());
          window.location.reload();
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  if (adBlockDetected) {
    return <AdBlockModal />;
  } else {
    return (
      <Router>
        <Header />
        <Toast position="bottom-left" />
        <Player />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/tracks" component={AllTracks} />
          <Route exact path="/track/detail/:track_id" component={SingleTrack} />
          <Route exact path="/cart" component={Cart} />
          <Route
            exact
            path="/checkout/success/:transaction_id"
            component={CheckoutSuccess}
          />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/newsletter" component={Newsletter} />
          <Route
            exact
            path="/newsletter/unsubscribe/success"
            component={NewsletterDeleteSuccess}
          />
          <Route
            exact
            path="/newsletter/unsubscribe/cancel"
            component={NewsletterDeleteCancel}
          />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/licences" component={Licences} />
          {token !== null ? (
            <Route exact path="/profile" component={Profile} />
          ) : (
            <Route exact path="/profile" component={Error404} />
          )}
          {/*All Other Route*/}
          <Route path="*" component={Error404} />
        </Switch>
        <Footer />
      </Router>
    );
  }
};

export default App;
