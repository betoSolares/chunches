import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ScrollToTop } from "../components";
import SearcherPage from "./searcher";
import SignUpPage from "./signup";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact component={SearcherPage} />
          <Route path="/searcher" exact component={SearcherPage} />
          <Route path="/signup" exact component={SignUpPage} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
};

export default App;
