import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authService } from '../services/authService';
import { Link, useNavigate } from 'react-router';

import '../styles/Signup.css';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await authService.signup(data);
      if (response.success) {
        navigate('/login');
      }
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>

      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="signup-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters long',
              },
            })}
          />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>

        <div className="signup-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <Link className="login-link" to="/login">
          Login
        </Link>
        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
