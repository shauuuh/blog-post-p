import { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password }); // send data to register route
      alert('Register successful. Please login.');
      navigate('/login'); 
    } catch (error) {
      console.error(error);
      alert('Error register');
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <input 
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;