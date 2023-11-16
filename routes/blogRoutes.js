const express = require('express');
const { blogIndex, 
        getBlogById, 
        postCreateBlog, 
        getCreateBlog, 
        deleteBlog, 
        getUpdateBlog,
        postUpdateBlog } = require('../controllers/blogController.js')

const router = express.Router();

router.get('/', blogIndex)

router.post('/', postCreateBlog)

router.get('/create-blog', getCreateBlog)

router.get('/:id/update-blog',getUpdateBlog)

router.put('/:id/update-blog', postUpdateBlog)

router.get('/:id', getBlogById)

router.delete('/:id', deleteBlog)





module.exports = router;