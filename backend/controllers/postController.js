import Post from '../models/Post.js';

const createPost = async (req, res) => {
  const { title, content, image, category } = req.body;
  const userId = req.user.id;

  try {    
    const post = await Post.create({ title, content, image, userId, category });
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
  const userId = req.user.id;
  
  try {
    const post = await Post.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error getting the posts'});
  }
};

const editPost = async (req,res) => {
  console.log("HERE 111");
  const { title, content, image, category } = req.body;
  const  { postId }  = req.params;
  console.log(req.params);
  
  try {
    const post = await Post.findByPk(postId);

    // Verify post exits and user auth
    if(!post) return res.status(404).json({ error: "Post not found"});
    if(post.userId != req.user.id) return res.status(403).json({ error: "Unauthorized"});
    
    // Update new data
    post.title = title;
    post.content = content;
    post.image = image;
    post.category = category;
    await post.save();

    res.json(post); // Response current data
  } catch (error) {
    console.error("Error updating the post", error);
    res.status(500).json({ error: 'Server error'});
  }
};

const deletePost = async (req,res) => {
  const { postId } = req.params;
  try {
    const deletedPost = await Post.destroy({ where: { id: postId }});
    if (deletedPost) {
      res.status(200).json({ message: 'Post deleted successfully'});
    } else {
      res.status(404).json({ message: 'Post not found'});
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the post'});
  }
};

export {createPost, getAllPosts, getUserPosts, editPost, deletePost};