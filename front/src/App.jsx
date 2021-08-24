import React, { useContext } from "react";
import TracksContextProvider from "./contexts/TracksContext";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import Tracks from "./pages/Tracks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Licences from "./pages/Licences";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Profile from "./pages/Profile";
import SingleTrack from "./pages/SingleTrack";
import Error404 from "./pages/error/Error404";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import MusicPlayer from "./components/player/MusicPlayer";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <TracksContextProvider>
      <Router>
        <Header />
        <MusicPlayer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tracks" component={Tracks} />
          <Route exact path="/track/detail/:track_id" component={SingleTrack} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/licences" component={Licences} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/privacy" component={Privacy} />
          {user !== null ? (
            <Route exact path="/profile" component={Profile} />
          ) : (
            <Route exact path="/profile" component={Error404} />
          )}
        </Switch>
        <Footer />
      </Router>
    </TracksContextProvider>
  );
};

export default App;
