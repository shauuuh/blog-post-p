import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login({ setAuth }) {
  const [form, setForm] = useState({ 
    email: '', 
    password: ''
  });
  //const navigate =  useNavigate();

  const handleChange = (e) => {
    setForm(prevValue => {
      return { ...prevValue, [e.target.name]: e.target.value };
    }); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data =  await login({ email: form.email, password: form.password });
      localStorage.setItem('token', data.token); //Save token in localStorage
      setAuth(true);
      console.log('Login successful');
    } catch (error) {
      console.error(error.response.data);
      alert('Error trying to login');      
    }
  };

  return(
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='email'
        placeholder='Email'
        value={form.email}
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={form.password}
        onChange={handleChange}
      />
      <button type='submit'>Login</button>
    </form>
  );
}

export default Login;