import axios from "axios";
import $ from "jquery";
import React, { useState, useEffect, createContext } from "react";
//interface
interface IAuth {
  password: string;
  email: string;
}
//creating context
export const AuthContext = createContext({} as any);

//the provider
const AuthContextProvider = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const signUp = (payload: IAuth) => {
    setLoading(true);
    axios({
      headers: {
        Accept: "application/json",
      },
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/register`,
      data: {
        email: payload.email,
        password: payload.password,
      },
    })
      .then((res) => {
        setIsActive(true);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };
  const login = (payload: IAuth) => {
    setLoading(true);
    axios({
      headers: {
        Accept: "application/json",
      },
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/login`,
      data: {
        email: payload.email,
        password: payload.password,
      },
    })
      .then((res) => {
        if (res.data.status !== 401) {
          setIsActive(true);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const logout = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/logout`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setIsActive(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isActive]);
  const value = {
    //variabels
    loading,
    isActive,
    error,
    //functions
    signUp,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
export default AuthContextProvider;
