import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUser, logout, initializeUser } from "../../store/reducers/userAuthSlice"; 
import { loginUser, logoutUser } from "../../service/account.service";
import Button from "../ui/button/button";
import classes from "./loginForm.module.scss";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userAuth.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userData = await loginUser(name, email);
      dispatch(setUser({ name: userData.name, email: userData.email })); 
      setError("");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
};


  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      setEmail("");
      setName("");
    } catch (err) {
      setError("Login failed");
    }
  };  
  return (
    <div className={classes.loginForm}>
      {user ? (
        <div className={classes.loggedIn}>
          <p>Logged in as: <strong>{user.email}</strong></p>
          <Button onClick={handleLogout} variant="primary" fullWidth>
            Logout
          </Button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className={classes.form}>
          <div className={classes.inputGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={classes.input}
            />
          </div>
          <div className={classes.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={classes.input}
            />
          </div>
          <Button type="submit" variant="primary" fullWidth>
            Login
          </Button>
          {error && <p className={classes.error}>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
