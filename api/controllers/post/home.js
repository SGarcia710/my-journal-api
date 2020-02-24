module.exports = async function(req, res) {
  console.log("This shows home page for posts");
  const allPosts = await Post.find();
  res.view("pages/home", { allPosts });
};
