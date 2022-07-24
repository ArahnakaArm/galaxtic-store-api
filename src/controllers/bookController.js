
import { Book } from '../models/index.js';
import { returnSuccess } from '../services/handlerResponse.js';
const getBook = async (req,res) => {
    const books = await Book.findAll()
    return returnSuccess(res,books)
}

export {
    getBook
}