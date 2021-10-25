import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ScrollToTop } from "../components";
import SignUpPage from "./signup";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/signup" exact component={SignUpPage} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
};

export default App;
