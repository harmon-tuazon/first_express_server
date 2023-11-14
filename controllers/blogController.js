const Blog = require('../models/blogs');

const blogIndex = (req, res) => {
    Blog.find()
    .then((result) => {res.render('blogs', { blogs: result })})
    .catch((err) => {console.error(err)})
}

const getCreateBlog = (req, res) => {
    res.render('createBlog')

}

const postCreateBlog = (req, res) => {
    const newBlog = new Blog(req.body)

    newBlog.save()
    .then((result) => {res.redirect('/blogs')})
    .catch((err) => {console.error(err)}) 
}

const getBlogById = (req, res) => {
    const id = req.params.id
   
    Blog.findById(id)
    .then((result) => {res.render('blogDetails', { blog: result })}) 
    .catch((err) => {console.error(err)})
}



const deleteBlog = (req, res) => {
    const id = req.params.id
   
    Blog.findById(id)
    .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
}

module.exports = {
    blogIndex,
    postCreateBlog,
    getCreateBlog,
    getBlogById,
    deleteBlog
}