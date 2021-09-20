const Post = require("../models/Post");
const fs = require("fs-extra");
const path = require("path");

module.exports = class Api {
  static async wellcome(req, res) {
    res.send("Welcome to VueJS Colabs API");
  }

  static async fetchAllPost(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.send(err);
    }
  }

  static async fetchPostById(req, res) {
    const id = req.params.id;
    try {
      const detail = await Post.findById(id);
      if (detail) {
        res.status(200).json({message: "Shown succesfullly!", data: detail});
      } else {
        res.status(404).json({message: "Not found", data: null});
      }
    } catch (err) {
      res.send(err);
    }
  }

  static async createPost(req, res) {
    const post = req.body;
    const imagename = req.file.filename;
    post.image = imagename;

    try {
      const createPost = await Post.create(post);
      res.status(200).json({message: "Created!", data: createPost});
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  }

  static async updatePost(req, res) {
    const id = req.params.id;
    let new_image = "";

    if (req.file) {
      new_image = req.file.filename;
      try {
        const pathImage = path.join("./src/uploads");
        fs.unlinkSync(pathImage + req.body.old_image);
      } catch (err) {
        console.log(err);
        res.send(err.message);
      }
    } else {
      new_image = req.body.old_image;
    }

    const newPost = req.body;
    newPost.image = new_image;
    newPost.updated = new Date().toISOString();

    try {
      const updatedData = await Post.findByIdAndUpdate(id, newPost);
      res
        .status(200)
        .json({message: "Post updated succesfully!", data: updatedData});
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  }

  static async deletePost(req, res) {
    const id = req.params.id;
    try {
      const deleted = Post.findByIdAndDelete(id);
      res.status(200).json({message: "Deleted succesfully!", data: deleted});
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
};
