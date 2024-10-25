import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password:''});
  const navigate =  useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data =  await login({ form });
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
        onChange={handleChange}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={handleChange}
      />
      <button type='submit'>Login</button>
    </form>
  );
}

export default Login;