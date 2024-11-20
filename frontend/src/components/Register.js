import { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { emailValidation, passwordValidation, nameValidation } from './DataValidation';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: ''});
  const [errors, setErrors] = useState({ name:'', email: '', password: '' });
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newErrors = {
        name: nameValidation(formData.name),
        email: emailValidation(formData.email),
        password: passwordValidation(formData.password),
        
      };

      if( !newErrors.email && !newErrors.password && !newErrors.name){
        await register({ name: formData.name, email: formData.email, password: formData.password }); // send data to register route
        alert('Register successful. Please login.');
        navigate('/login');
      } else {
        setErrors(newErrors);
      }       
    } catch (error) {
      console.error(error.response.data);
      alert('Error register');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} >
      <div>
        <label>Name:</label>
        <input
          type='text'
          placeholder='Full Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="text"
          placeholder="user@example.com"
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          minlength="3" 
          maxlength="64"
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;