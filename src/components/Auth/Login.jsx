import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContextProvider";
import Loader from "../Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, error, setError, loading } = useAuth();

  function handleSave(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert(`заполните поля`);
    } else {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      handleLogin(formData, email);
    }
  }

  useEffect(() => {
    setError(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Login Page</h1>

      {error ? <h2>{error}</h2> : null}
      <form action="submit" onSubmit={handleSave}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
