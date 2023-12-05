const express = require('express');
const { authCheck } = require('../controllers/userController.js')
const { blogIndex, 
        getBlogById, 
        postCreateBlog, 
        getCreateBlog, 
        deleteBlog, 
        getUpdateBlog,
<<<<<<< HEAD
        postUpdateBlog,
        authorizationCheck } = require('../controllers/blogController.js')
=======
        postUpdateBlog } = require('../controllers/blogController.js')
>>>>>>> 18c6f66d79ecc1ed963f9842fa06e8ca7172e4c0

const router = express.Router();

router.get('/', authCheck, blogIndex)

router.post('/', authCheck, postCreateBlog)

router.get('/create-blog', authCheck, getCreateBlog)

<<<<<<< HEAD
router.get('/:id/update-blog', authCheck, authorizationCheck, getUpdateBlog)

router.post('/:id', authCheck, authorizationCheck, postUpdateBlog)

router.get('/:id', authCheck, getBlogById)

router.delete('/:id', authCheck, authorizationCheck, deleteBlog)
=======
router.get('/:id/update-blog', authCheck, getUpdateBlog)

router.post('/:id', authCheck, postUpdateBlog)

router.get('/:id', authCheck, getBlogById)

router.delete('/:id', authCheck, deleteBlog)



>>>>>>> 18c6f66d79ecc1ed963f9842fa06e8ca7172e4c0


module.exports = router;