import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =  useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data =  await login({ email, password});
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
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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