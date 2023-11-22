const express = require('express');
const { authCheck } = require('../controllers/userController.js')
const { blogIndex, 
        getBlogById, 
        postCreateBlog, 
        getCreateBlog, 
        deleteBlog, 
        getUpdateBlog,
        postUpdateBlog } = require('../controllers/blogController.js')

const router = express.Router();

router.get('/', authCheck, blogIndex)

router.post('/', authCheck, postCreateBlog)

router.get('/create-blog', authCheck, getCreateBlog)

router.get('/:id/update-blog', authCheck, getUpdateBlog)

router.post('/:id', authCheck, postUpdateBlog)

router.get('/:id', authCheck, getBlogById)

router.delete('/:id', authCheck, deleteBlog)





module.exports = router;