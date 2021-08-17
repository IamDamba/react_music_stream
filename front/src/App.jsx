import React from "react";
import TracksContextProvider from "./contexts/TracksContext";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import Tracks from "./pages/Tracks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
// import Licences from "./pages/Licences";
// import Terms from "./pages/Terms";
// import Privacy from "./pages/Privacy";
// import PaymentSuccess from "./pages/PaymentSuccess";
// import PaymentCancel from "./pages/Payment_Cancel";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SingleTrack from "./pages/SingleTrack";

const App = () => {
  return (
    <TracksContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tracks" component={Tracks} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/track/detail/:track_id" component={SingleTrack} />
          {/*
            <Route exact path="/payment/success" component={PaymentSuccess} />
            <Route exact path="/payment/cancel" component={PaymentCancel} />
            <Route exact path="/licences" component={Licences} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/privacy" component={Privacy} />
          */}
        </Switch>
        <Footer />
      </Router>
    </TracksContextProvider>
  );
};

export default App;
