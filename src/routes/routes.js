const express = require("express");
const router = express.Router();
const Api = require("../controller/api");
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./src/uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + new Date().toISOString() + "_" + file.originalname
    );
  },
});

let upload = multer({storage: storage}).single("image");

router.get("/", Api.wellcome);
router.get("/api/posts", Api.fetchAllPost);
router.get("/:id", Api.fetchPostById);
router.post("/api/post", upload, Api.createPost);
router.patch("/:id", upload, Api.updatePost);
router.delete("/:id", Api.deletePost);

module.exports = router;
