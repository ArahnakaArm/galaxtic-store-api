import express from 'express'
import { getBook } from '../controllers/bookController.js'
const BookRoute = express.Router();

BookRoute.get('/' , getBook)

export default BookRoute
