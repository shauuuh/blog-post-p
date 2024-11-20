import { useState } from 'react';
import { createPost } from '../services/api';

function CreatePost(){

  const [form, setForm] = useState({
    title: '',
    content: '',
    image: '',
    category: ''
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
        category: form.category
      };

        await createPost( postData, token );
        alert('Post created successfully');
       
    } catch (error) {
      console.error(error.response.data);
      alert('Error creating the post');
    }
  };

  return(
    <form onSubmit={handleSubmit}>
      <input type='text' name='title' placeholder='Title' value={form.title} onChange={handleChange} required/>
      <input type='text' name='content' placeholder='Write something...' value={form.content} onChange={handleChange} required/>
      <input type='text' name='image' value={form.image} onChange={handleChange}/>
      <select name="category" value={form.category} onChange={handleChange}>
          <option value="Science">Science</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Issues">Issues</option>
          <option value="News">News</option>
          <option value="Video Games">Video Games</option>
          <option value="Love">Love</option>
          <option value="Sports">Sports</option>
          <option value="Other">Other</option>
        </select>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default CreatePost;