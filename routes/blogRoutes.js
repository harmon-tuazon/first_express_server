const express = require('express');
const { blogIndex, getBlogById, postCreateBlog, getCreateBlog, deleteBlog } = require('../controllers/blogController.js')

const router = express.Router();

router.get('/', blogIndex)

router.post('/', postCreateBlog)

router.get('/create-blog', getCreateBlog)

router.get('/:id', getBlogById)

router.delete('/:id', deleteBlog)



module.exports = router;