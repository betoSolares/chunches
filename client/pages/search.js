import React, {useEffect, useState} from "react";
import { NavBar } from "../components";

const Search = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(localStorage.getItem("WDYBYC_AUTHENTICATED") ?? false);
  });

  return (
    <>
      <NavBar authenticated={authenticated} />
      <h1>SEARCH</h1>
    </>
  );
};

export default Search;
