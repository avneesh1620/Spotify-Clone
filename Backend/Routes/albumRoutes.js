import express from 'express'
import upload from '../Middleware/multer.js'
import { addAlbum, listAlbum, removeAlbum } from '../Controllers/albumControllers.js'

const router = express.Router()

router.post('/add', upload.single('image'), addAlbum)
router.get('/list', listAlbum)
router.post('/remove', removeAlbum)


export default router