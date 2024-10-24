import { useEffect, useState } from 'react';
import { getPost } from '../services/api';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPost();
      setPosts(data);
    };
    fetchPost();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>{new Date(post.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;