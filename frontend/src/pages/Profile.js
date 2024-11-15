import React, { useEffect, useState } from "react";
import { getUserPosts, updatePost, deletePost } from "../services/api";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', image: '', category: 'Other'});

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      const data = await getUserPosts(token);
        setPosts(data);
      }; 
    fetchPost();  
  }, []);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setForm(prevData => ({...prevData, [name]: value }));
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setForm({title: post.title, content: post.content, image: post.image, category: post.category});
  };

  const submitEdit = async (e, postId) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await updatePost(postId, form, token);
      setPosts(posts.map(post => post.id === postId ? { ...post, ...form} : post));
      setEditingPost(null);
      setForm({ title: '', content: '', image: '', category: 'Other'});
      alert('Data updated successfully');
    } catch (error) {
      console.error(error.response.data);
      alert('Error updating the post');
    }
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Are you sure of delete this post?');
    
    if(!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await deletePost(postId, token);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting that post');
    }
  };

  return(
    <div>
      <h1>User profile </h1>
      <h2>My posts</h2>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>{post.category}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div> 
        ))}

      {editingPost && (
      <form onSubmit={(e) => submitEdit(e, editingPost.id)}>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleInputChange}/>
        <input type="text" name="content" placeholder="Write something..." value={form.content} onChange={handleInputChange}/>
        <input type="text" name="image" value={form.image} onChange={handleInputChange}/>
        <select name="category" value={form.category} onChange={handleInputChange}>
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
        <button type="submit">Save changes</button>
        <button type="button" onClick={() => setEditingPost(null)}>Cancel</button>
      </form>
      )}  
    </div>
  );
};

export default Profile;