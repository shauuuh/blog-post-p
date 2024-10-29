import Post from '../models/Post.js';

const createPost = async (req, res) => {
  const { title, content, image } = req.body;
  const userId = req.userId;
  console.log(title);
  console.log(req);
  try {
    console.log("inf");
    console.log(title);
    console.log(content);
    console.log(img);
    console.log(userId);
    
    const post = await Post.create({ title, content, image, userId });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error creating the post'});
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error getting the posts'});
  }
};

const getUserPosts = async (req, res) => {
  const userId = req.userId;
  try {
    const post = await Post.findAll({
      where: {
        authorId: userId,
      },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error getting the posts'});
  }
}

export {createPost, getAllPosts, getUserPosts};