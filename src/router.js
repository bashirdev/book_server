import express from 'express'
import { BookUpdate, CreateBook, DeleteSingleBook, GetSingleBook, QueryGetAllBook } from "./controller.js";

const router =express.Router();

router.post('/create-book', CreateBook)
router.delete('/DeleteSingleBook/:id', DeleteSingleBook)
router.patch('/BookUpdate/:id', BookUpdate)
router.get('/QueryGetAllBook/:pageNo?/:perPage?/:searchKeyword?', QueryGetAllBook )
router.get('/GetSingleBook/:id', GetSingleBook)



export default router
