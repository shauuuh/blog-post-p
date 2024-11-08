import React, { useEffect, useState } from "react";
import { getUserPosts } from "../services/api";

function Profile() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      const data = await getUserPosts(token);
        setPosts(data);
      }; 
    fetchPost();  
  }, []);

  return(
    <div>
      <h1>User profile </h1>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;