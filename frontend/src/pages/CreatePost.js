import { useState } from 'react';
import { createPost } from '../services/api';

function CreatePost(){

  const [form, setForm] = useState({
    title: '',
    content: '',
    image: ''
  }); 

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const postData = {
        title: form.title, 
        content: form.content, 
        image: form.image,
        }

        await createPost( postData, token );
        alert('Post created successfully');
       
    } catch (error) {
      console.error(error.response.data);
      alert('Error creating the post');
    }
  };

  return(
    <form onSubmit={handleSubmit}>
      <input type='text' name='title' placeholder='Title' value={form.title} onChange={handleChange}/>
      <input type='text' name='content' placeholder='Write something...' value={form.content} onChange={handleChange}/>
      <input type='text' name='image' value={form.image} onChange={handleChange}/>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default CreatePost;