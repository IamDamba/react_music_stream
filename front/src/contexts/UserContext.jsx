import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getUser, getUserToken } from "../slices/userSlice";

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const { user, token } = useSelector((state) => state.user);

  const [globalUser, setGlobalUser] = useState(null);
  const dispatch = useDispatch();

  const getUserFromReducer = () => {
    if (user !== null) {
      setGlobalUser(user);
      console.log("Caught him");
    }
  };
  const getUserFromStorageToReducer = async () => {
    if (token !== null) {
      await axios
        .post("/api/currentuser", {
          token: token,
        })
        .then((res) => {
          console.log(res.data.user);
          dispatch(getUser(res.data.user));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    getUserFromReducer();
  }, [user]);

  useEffect(() => {
    getUserFromStorageToReducer();
  }, [token]);

  useEffect(() => {
    dispatch(getUserToken());
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: globalUser,
        dataToReducer: getUserFromStorageToReducer,
        getUser: getUserFromReducer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
