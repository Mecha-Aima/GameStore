import './Auth.css';
import React, { useState } from "react";
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo/logo.png';

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
  const navigate = useNavigate();
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
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        login(data.user);
        console.log(data.user);
        // redirect to home page
        navigate('/home');
      } else {
        // handle error
        console.log(`Error ${res.status}: Invalid email or password`);
        alert('Invalid email or password');
      }
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
function SignupForm({ setShowDetailsForm }) {
  const { signup } = useUser();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ username, email, password }),
        });
        if (res.ok) {
          const data = await res.json();
          console.log("signup response:", data);
          signup(data.user);
          setShowDetailsForm(true);
        } else {
          const errorData = await res.json();
          alert(errorData.error || 'Signup failed');
        }
      } catch (err) {
        alert('Signup failed. Please try again.');
      }
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

// ------------------ Details Form ------------------
function DetailsForm() {
  const navigate = useNavigate();
  const { user, signup } = useUser();
  const [values, setValues] = useState({
    fullName: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!values.fullName) newErrors.fullName = 'Full Name is required';
    if (!values.phone) newErrors.phone = 'Phone No is required';
    if (!values.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    console.log("signup form valid, submitting:", values);
    try {
      const res = await fetch('http://localhost:3000/api/auth/create_customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          user_id: user.user_id,
          full_name: values.fullName,
          phone: values.phone,
          address: values.address
        })
      });
      if (res.ok) {
        signup({ ...user, full_name: values.fullName, phone: values.phone, address: values.address });
        console.log("details form response:", res);
        console.log("user:", user);
        navigate('/home');
        alert('Account created successfully!');
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to create customer details');
      }
    } catch (err) {
      alert('Failed to create customer details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div>
        <input
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          type="text"
          className="auth-input"
        />
        {errors.fullName && <p className="auth-error">{errors.fullName}</p>}
      </div>
      <div>
        <input
          name="phone"
          value={values.phone}
          onChange={handleChange}
          placeholder="Phone No"
          type="text"
          className="auth-input"
        />
        {errors.phone && <p className="auth-error">{errors.phone}</p>}
      </div>
      <div>
        <input
          name="address"
          value={values.address}
          onChange={handleChange}
          placeholder="Address"
          type="text"
          className="auth-input"
        />
        {errors.address && <p className="auth-error">{errors.address}</p>}
      </div>
      <button type="submit" className="auth-button mt-4" disabled={loading}>
        {loading ? 'Creating...' : 'Create Account'}
      </button>
    </form>
  );
}

// ------------------ Main Auth Component ------------------
function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  return (
    <div className="flex flex-col h-fit justify-center items-center gap-32">
      <div className="auth-container mb-24 max-w-xl w-full">
        <div className="auth-card">
          <img src={logo} alt="PLAYTRIX" className="auth-logo" width={100} height={100} style={{ display: 'block', margin: '0 auto' }} />
          <h2 className="auth-title">
            {isLogin ? "Login" : showDetailsForm ? "Enter your details" : "Create Account"}
          </h2>
          {isLogin ? <LoginForm /> : showDetailsForm ? <DetailsForm /> : <SignupForm setShowDetailsForm={setShowDetailsForm} />}
          <div className="auth-toggle text-slate-200">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setIsLogin(!isLogin); setShowDetailsForm(false); }}
              className="auth-toggle-button text-teal-20"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Auth;