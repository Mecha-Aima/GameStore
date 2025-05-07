/* 
Login & Registration Page

Tab Toggle: Switch between “Login” and “Register” forms
Form Fields
Login: Email, Password, “Remember me” checkbox
Register: Username, Email, Password, Confirm Password
Validation Messages: Inline errors for required fields, email format, password strength (e.g. ≥ 8 chars, mix of letters & numbers)
Submit Button: Disabled until form is valid
*/
import './Auth.css';
import React, { useState } from "react";

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

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <input
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        className="p-3 rounded border border-navy-20 focus:outline-none focus:ring-2 focus:ring-teal-50"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
        className="p-3 rounded border border-navy-20 focus:outline-none focus:ring-2 focus:ring-teal-50"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}

      <label className="flex items-center gap-2 text-sm">
        <input
          name="rememberMe"
          type="checkbox"
          checked={rememberMe}
          onChange={handleChange}
        />
        Remember Me
      </label>

      <button
        onClick={validate}
        disabled={!email || !password || Object.keys(errors).length > 0}
        className="bg-teal-50 text-white font-semibold py-2 rounded hover:bg-teal-60 transition disabled:opacity-50"
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
        errs.password =
          "Password must be 8+ chars, with letters & numbers";
      if (confirmPassword !== password)
        errs.confirmPassword = "Passwords do not match";
      return errs;
    }
  );

  const { username, email, password, confirmPassword } = values;

  const isFormValid =
    username &&
    email &&
    password &&
    confirmPassword &&
    isValidEmail(email) &&
    isStrongPassword(password) &&
    password === confirmPassword;

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <input
        name="username"
        value={username}
        onChange={handleChange}
        placeholder="Username"
        type="text"
        className="p-3 rounded border border-navy-20 focus:outline-none focus:ring-2 focus:ring-teal-50"
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username}</p>
      )}

      <input
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        className="p-3 rounded border border-navy-20 focus:outline-none focus:ring-2 focus:ring-teal-50"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
        className="p-3 rounded border border-navy-20 focus:outline-none focus:ring-2 focus:ring-teal-50"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}

      <input
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        type="password"
        className="p-3 rounded border border-navy-20 focus:outline-none focus:ring-2 focus:ring-teal-50"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
      )}

      <button
        onClick={validate}
        disabled={!isFormValid}
        className="bg-teal-50 text-white font-semibold py-2 rounded hover:bg-teal-60 transition disabled:opacity-50"
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
    <div className="bg-teal-20 text-navy-80 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-mint-10 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 underline">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <p className="mt-4 text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-teal-50 hover:underline font-semibold"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
