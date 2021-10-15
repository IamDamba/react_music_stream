// ||||||||||||||||||||||| Dependencies |||||||||||||||||||||||||

import React from "react";
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

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../pages/views/profile/Profile";
import CheckoutSuccess from "../pages/views/checkout/CheckoutSuccess";

// ||||||||||||||||||||||| App |||||||||||||||||||||||||

const App = () => {
  const { token } = useSelector((state) => state.userReducer);

  // const testList = [
  //   {
  //     id: 1,
  //     title: "Success",
  //     description: "This is a success toast component",
  //     backgroundColor: "#5cb85c",
  //     icon: checkIcon,
  //   },
  //   {
  //     id: 2,
  //     title: "Danger",
  //     description: "This is an error toast component",
  //     backgroundColor: "#d9534f",
  //     icon: errorIcon,
  //   },
  //   {
  //     id: 3,
  //     title: "Info",
  //     description: "This is an info toast component",
  //     backgroundColor: "#5bc0de",
  //     icon: infoIcon,
  //   },
  //   {
  //     id: 4,
  //     title: "Warning",
  //     description: "This is a warning toast component",
  //     backgroundColor: "#f0ad4e",
  //     icon: warningIcon,
  //   },
  // ];

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
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/licences" component={Licences} />
        {token !== null ? (
          <Route exact path="/profile" component={Profile} />
        ) : (
          <Route exact path="/profile" component={Error404} />
        )}
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
