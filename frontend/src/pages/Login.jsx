import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/authContext';

import '../styles/Login.css';
import { Link } from 'react-router';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      await login(data);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>
        <div className="login-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        {error && <p className="error-message">{error}</p>}
        <Link to="/signup" className="signup-link">
          Sign up now
        </Link>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
