import React, { createContext, useState } from "react";

export const TracksContext = createContext();
const TracksContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <TracksContext.Provider
      value={{ search: searchValue, setSearch: setSearchValue }}
    >
      {children}
    </TracksContext.Provider>
  );
};

export default TracksContextProvider;
