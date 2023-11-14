const express = require('express');
const { blogIndex, postCreateBlog, getCreateBlog } = require('../controllers/blogController.js')

const router = express.Router();

router.get('/', blogIndex)

router.post('/', postCreateBlog)

router.get('/create-blog', getCreateBlog)




module.exports = router;