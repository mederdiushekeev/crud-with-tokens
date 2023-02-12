import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://34.173.115.25/api/v1";

export const authContext = createContext();

export const useAuth = () => useContext(authContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //TODO   =======  register
  async function handleRegister(formData) {
    setLoading(true);

    try {
      const res = await axios.post(`${API}/account/register/`, formData);
      //   console.log(res);
      navigate("/register-success");
    } catch (error) {
      setError(Object.values(error.response.data).flat(2));
    } finally {
      setLoading(false);
    }
  }

  //TODO  ======= login
  async function handleLogin(formData, email) {
    setLoading(true);

    try {
      const res = await axios.post(`${API}/account/login/`, formData);

      localStorage.setItem("tokens", JSON.stringify(res.data));
      localStorage.setItem("email", email);
      setUser(email);
      navigate("/");
    } catch (error) {
      setError(error.response.data.detail);
    } finally {
      setLoading(false);
    }
  }

  const checkAuth = async () => {
    setLoading(true);

    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access}`;

      const config = {
        headers: {
          Authorization,
        },
      };

      const res = await axios.post(`${API}/account/token/refresh/`, {
        refresh: tokens.refresh,
        config,
      });
      localStorage.setItem(
        "tokens",
        JSON.stringify({
          access: res.data.access,
          refresh: tokens.refresh,
        })
      );
      const email = localStorage.getItem("email");
      setUser(email);
    } catch (error) {
      console.log(error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    setUser(false);
    navigate("/login");
  };

  const values = {
    handleRegister,
    handleLogin,
    error,
    user,
    checkAuth,

    setError,
    loading,

    handleLogout,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
