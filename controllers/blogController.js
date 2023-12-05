const Blog = require('../models/blogs');

const blogIndex = (req, res) => {
    Blog.find()
    .then((result) => {res.render('blogs', { blogs: result, title: "All Blogs" })})
    .catch((err) => {console.error(err)})
}

const getCreateBlog = (req, res) => {
    res.render('createBlog', { title: "Create New Blog" })

}

const postCreateBlog = (req, res) => {
<<<<<<< HEAD
    const newBlog = new Blog({
        ...req.body,
        user_id: res.locals.user._id})
=======
    const newBlog = new Blog(req.body)
>>>>>>> 18c6f66d79ecc1ed963f9842fa06e8ca7172e4c0

    newBlog.save()
    .then((result) => {res.redirect('/blogs')})
    .catch((err) => {console.error(err)}) 
}

const getBlogById = (req, res) => {
    const id = req.params.id
   
    Blog.findById(id)
<<<<<<< HEAD
    .then((result) => {res.render('blogDetails', { blog: result, title: "Blog Details", user: req.user })}) 
=======
    .then((result) => {res.render('blogDetails', { blog: result, title: "Blog Details" })}) 
>>>>>>> 18c6f66d79ecc1ed963f9842fa06e8ca7172e4c0
    .catch((err) => {console.error(err)})
}


const deleteBlog = (req, res) => {
    const id = req.params.id
<<<<<<< HEAD

    Blog.findByIdAndDelete(id)
        .then(result => {res.json({ redirect: '/blogs' })})
        .catch(err => {res.status(404)});
=======
   
    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
>>>>>>> 18c6f66d79ecc1ed963f9842fa06e8ca7172e4c0
}

const getUpdateBlog = (req, res) => {
    const id = req.params.id
<<<<<<< HEAD

=======
   
>>>>>>> 18c6f66d79ecc1ed963f9842fa06e8ca7172e4c0
    Blog.findById(id)
    .then((result) => {res.render('updateBlog', { blog: result, title: "Update Blog" })}) 
    .catch((err) => {console.error(err)})
}

const postUpdateBlog = (req, res) => {
    const id = req.params.id
    const replace = req.body
   
    Blog.findByIdAndUpdate(id, replace, { new: true })
    .then(result => {res.redirect(`/blogs/${id}`) })
    .catch(err => {console.log(err);});
}

<<<<<<< HEAD
const authorizationCheck = async (req, res, next) => {
    const id = req.params.id
    const userID = req.user._id.toString()
    const blog = await Blog.findById(id)
    
    try { 
        if (userID === blog.user_id) {
            next()
        } else {
            if (req.method === 'DELETE') { 
                res.json({ 
                    redirect: '/404',
                    message: "Unauthorized Access"
             })} else {
                res.redirect('/404')
             }
        }
        } catch(err) {
            console.log(err)
        }
}

=======
>>>>>>> 18c6f66d79ecc1ed963f9842fa06e8ca7172e4c0
module.exports = {
    blogIndex,
    postCreateBlog,
    getCreateBlog,
    getBlogById,
    deleteBlog,
    getUpdateBlog,
<<<<<<< HEAD
    postUpdateBlog,
    authorizationCheck
=======
    postUpdateBlog
>>>>>>> 18c6f66d79ecc1ed963f9842fa06e8ca7172e4c0
}