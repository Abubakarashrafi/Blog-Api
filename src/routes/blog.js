const express = require("express");
const blogRouter = express.Router();
const PostData = require("../model/post");
const UserData = require("../model/user");
const { authentication, userAction, admin } = require("../middleware/auth");

// Create Blog
blogRouter.post("/create", authentication, async (req, res) => {
  try {
    let { title, description, categories } = req.body;
    const post = await PostData.create({
      title,
      description,
      categories,
      userId: req.user.id,
    });
    // console.log(username);
    await post.save();
    res.status(200).json({ msg: "blog created" });
  } catch (err) {
    console.log(err.message);
  }
});

// Update blog
blogRouter.patch("/update/:id", authentication, async (req, res) => {
  try {
    const { title, description, categories } = req.body;
    const blog = await PostData.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (blog) {
      const updatedBlog = await PostData.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedBlog);
    } else {
      res.status(404).json("You are not allowed to perform these tasks");
    }
  } catch (err) {
    console.log(err.message);
  }
});

// Delete blog
blogRouter.delete("/delete/:id", authentication, async (req, res) => {
  const blog = await PostData.findOne({
    _id: req.params.id,
    userId: req.user.id,
    
  });
  if (blog) {
    const deletePost = await PostData.deleteOne({
      _id: req.params.id
    });
    res.status(200).json({msg : 'blog post deleted sucessfully',blog :deletePost})
  } else {
    res.status(403).json('Blog post not exist or you are not authorized')
  }
});

blogRouter.get("/blogs", async (req, res) => {
  const blogs = await PostData.find();
  res.status(200).json(blogs);
});

blogRouter.get("/blogs/:id", async (req, res) => {
  const blogs = await PostData.findById(req.params.id);
  res.status(200).json(blogs);
});

blogRouter.get('/find', async(req,res) => {
  try {
    let title = req.query.title
    const post = await PostData.find({title : title})
     res.status(200).json(post);
    
  } catch (err) {
    console.log(err.message);
  }
})

module.exports = blogRouter;

