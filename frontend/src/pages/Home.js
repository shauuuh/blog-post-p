import { useEffect, useState } from 'react';
import { getPost } from '../services/api';

function Home(){
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortOption, setSortOption] = useState('date');
  const [filterOption, setFilterOption] = useState('');
  
  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPost();
      setPosts(data);
      setFilteredPosts(data);
    };
    fetchPost();
  }, []);

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortOption(sort);
    
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      if(sort === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sort === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
    setFilteredPosts(sortedPosts);
  };
  
  const handleFilterChange = (e) => {
    const filter = e.target.value.toLowerCase();
    setFilterOption(filter);

    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(filter) ||
      post.content.toLowerCase().includes(filter) ||
      post.category.toLowerCase().includes(filter)
    );

    setFilteredPosts(filtered);
  };

  return (
    <div>
      <h1>Posts</h1>
      {/* Select to sort and filter */}
      <div>
        <label>Sort to:</label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="date">Date</option>
          <option value="title">Title</option>
        </select>
        <label>Filter:</label>
        <input
          type='text'
          placeholder='Search a title, content, category...'
          value={filterOption}
          onChange={handleFilterChange}
        />
      </div>

      {/* Render posts */}
      {filteredPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <img
              src={post.image}
              alt={post.title}
              style={{ width: '300px', height: 'auto'}}
          />
          <p>{post.content}</p>
          <p>{post.category}</p>
          <p>{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );   
  
}
  
export default Home;