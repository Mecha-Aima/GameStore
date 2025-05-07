import './Auth.css';
import React, { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
// You can import your logo here
// import logo from '../assets/images/logo.png';

// ------------------ Utilities ------------------
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isStrongPassword = (pwd) =>
  pwd.length >= 8 && /[A-Za-z]/.test(pwd) && /\d/.test(pwd);

// ------------------ Custom Hook ------------------
function useForm(initialValues, validateFn) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = validateFn(values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validate };
}

// ------------------ Login Form ------------------
function LoginForm() {
  const { values, errors, handleChange, validate } = useForm(
    { email: "", password: "", rememberMe: false },
    ({ email, password }) => {
      const errs = {};
      if (!email) errs.email = "Email is required";
      else if (!isValidEmail(email)) errs.email = "Invalid email format";
      if (!password) errs.password = "Password is required";
      return errs;
    }
  );

  const { email, password, rememberMe } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login form valid, submitting:", values);
      // Handle form submission here
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div>
        <input
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="auth-input"
        />
        {errors.email && <p className="auth-error">{errors.email}</p>}
      </div>

      <div>
        <input
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="auth-input"
        />
        {errors.password && <p className="auth-error">{errors.password}</p>}
      </div>

      <label className="auth-checkbox-label">
        <input
          name="rememberMe"
          type="checkbox"
          checked={rememberMe}
          onChange={handleChange}
          className="auth-checkbox"
        />
        Remember Me
      </label>

      <button
        type="submit"
        disabled={!email || !password}
        className="auth-button"
      >
        Login
      </button>
    </form>
  );
}

// ------------------ Signup Form ------------------
function SignupForm() {
  const { values, errors, handleChange, validate } = useForm(
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    ({ username, email, password, confirmPassword }) => {
      const errs = {};
      if (!username) errs.username = "Username is required";
      if (!email) errs.email = "Email is required";
      else if (!isValidEmail(email)) errs.email = "Invalid email format";
      if (!password) errs.password = "Password is required";
      else if (!isStrongPassword(password))
        errs.password = "Password must be 8+ chars, with letters & numbers";
      if (confirmPassword !== password)
        errs.confirmPassword = "Passwords do not match";
      return errs;
    }
  );

  const { username, email, password, confirmPassword } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Signup form valid, submitting:", values);
      // Handle form submission here
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div>
        <input
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Username"
          type="text"
          className="auth-input"
        />
        {errors.username && <p className="auth-error">{errors.username}</p>}
      </div>

      <div>
        <input
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="auth-input"
        />
        {errors.email && <p className="auth-error">{errors.email}</p>}
      </div>

      <div>
        <input
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="auth-input"
        />
        {errors.password && <p className="auth-error">{errors.password}</p>}
      </div>

      <div>
        <input
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          type="password"
          className="auth-input"
        />
        {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword}</p>}
      </div>

      <button
        type="submit"
        className="auth-button"
      >
        Sign Up
      </button>
    </form>
  );
}

// ------------------ Main Auth Component ------------------
function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <Header />
      
      <div className="auth-container">
        <div className="auth-card">
          {/* Logo can be added here
          <div className="auth-logo">
            <img src={logo} alt="PLAYTRIX" />
          </div>
          */}
          
          <h2 className="auth-title">
            {isLogin ? "Login" : "Create Account"}
          </h2>

          {isLogin ? <LoginForm /> : <SignupForm />}

          <div className="auth-toggle">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="auth-toggle-button"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Auth;