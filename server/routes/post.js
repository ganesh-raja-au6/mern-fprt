import express from 'express'

const router = express.Router()

import { getAllPost,singlePost,createPost,deletePost,updatePost,myPost }  from '../controllers/post.js'

import { protect,admin } from '../middleware/authMiddleware.js'


router.route('/').post(protect,createPost).get( getAllPost)
router.route('/mypost').get(protect,myPost)


router.route('/:id').delete(protect, deletePost).get(singlePost).put(protect,updatePost)

export default router