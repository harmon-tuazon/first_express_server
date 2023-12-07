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
    const newBlog = new Blog({
                            ...req.body,
                            user_id: res.locals.user._id,
                            likes: 0,
                            dislikes: 0,      
                        })

    newBlog.save()
    .then((result) => {res.redirect('/blogs')})
    .catch((err) => {console.error(err)}) 
}

const getBlogById = (req, res) => {
    const id = req.params.id
   
    Blog.findById(id)
    .then((result) => {res.render('blogDetails', { blog: result, title: "Blog Details", user: req.user })}) 
    .catch((err) => {console.error(err)})
}


const deleteBlog = (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(result => {res.json({ redirect: '/blogs' })})
        .catch(err => {res.status(404)});
}

const getUpdateBlog = (req, res) => {
    const id = req.params.id

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

const putUpdateLikesBlog = async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)

    let blogLikes = Number(blog.likes) + 1
    let blogDislikes = Number(blog.dislikes) + 1
    let replace = (req.originalUrl === `/blogs/${id}/like`) ? { likes: blogLikes } : { dislikes: blogDislikes }; 
       

    Blog.findByIdAndUpdate(id, replace , { new: true })
        .then(result => {res.json({ redirect: "/blogs" })})
        .catch(err => {console.log(err);})

}



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

module.exports = {
    blogIndex,
    postCreateBlog,
    getCreateBlog,
    getBlogById,
    deleteBlog,
    getUpdateBlog,
    postUpdateBlog,
    authorizationCheck,
    putUpdateLikesBlog,
}