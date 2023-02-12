import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContextProvider";
import Loader from "../Loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { handleRegister, error, loading, setError } = useAuth();

  function handleSave(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
      alert(`заполните поля`);
    } else {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirm", passwordConfirm);

      handleRegister(formData);
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
      <h1>Register</h1>

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
        <input
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          placeholder="confirm password"
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
