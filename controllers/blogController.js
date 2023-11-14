const Blog = require('../models/blogs');

const blogIndex = (req, res) => {
    Blog.find()
    .then((result) => {res.render('blogs', { blogs: result })})
    .catch((err) => {console.error(err)})
}

const postCreateBlog = (req, res) => {
    const newBlog = new Blog(req.body)

    newBlog.save()
    .then((result) => {res.redirect('/blogs')})
    .catch((err) => {console.error(err)}) 
}

const getCreateBlog = (req, res) => {
    res.render('createBlog')

}

module.exports = {
    blogIndex,
    postCreateBlog,
    getCreateBlog
}