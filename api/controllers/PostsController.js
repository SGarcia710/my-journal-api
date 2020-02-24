module.exports = {
  posts: async function(req, res) {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (error) {
      return res.serverError(error.toString());
    }
  },
  create: async function(req, res) {
    const postTitle = req.body.postTitle;
    const postBody = req.body.postBody;

    sails.log.debug("Title: " + postTitle);
    sails.log.debug("Body: " + postBody);

    try {
      await Post.create({ title: postTitle, body: postBody });
      return res.redirect("/home");
    } catch (error) {
      return res.serverError(error.toString());
    }
  },
  findById: function(req, res) {
    const postId = req.param("postId");

    const filteredPosts = ALLPOSTS.filter(({ id }) => id === parseInt(postId));

    if (filteredPosts.length > 0) {
      res.send(filteredPosts);
    } else {
      res.send("Failed to find post by id: " + postId);
    }
  },
  delete: async function(req, res) {
    const postId = req.param("postId");
    await Post.destroy({ id: postId });
    res.send("Finish deliting post now");
  }
};
