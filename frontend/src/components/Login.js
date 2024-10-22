import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate =  useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data =  await login({ username, password});
      localStorage.setItem('token', data.token); //Save token in localStorage
      alert('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Error trying to login');      
    }
  };

  return(
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Login</button>
    </form>
  );
}

export default Login;