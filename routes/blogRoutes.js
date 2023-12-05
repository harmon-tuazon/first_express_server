const express = require('express');
const { authCheck } = require('../controllers/userController.js')
const { blogIndex, 
        getBlogById, 
        postCreateBlog, 
        getCreateBlog, 
        deleteBlog, 
        getUpdateBlog,
        postUpdateBlog,
        authorizationCheck } = require('../controllers/blogController.js')

const router = express.Router();

router.get('/', authCheck, blogIndex)

router.post('/', authCheck, postCreateBlog)

router.get('/create-blog', authCheck, getCreateBlog)

router.get('/:id/update-blog', authCheck, authorizationCheck, getUpdateBlog)

router.post('/:id', authCheck, authorizationCheck, postUpdateBlog)

router.get('/:id', authCheck, getBlogById)

router.delete('/:id', authCheck, authorizationCheck, deleteBlog)


module.exports = router;