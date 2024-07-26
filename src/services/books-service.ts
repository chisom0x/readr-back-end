import bookModel from '../models/book-model';
import mongoose from 'mongoose';

export default class bookService {
  static async createBook(bookData: {
    title: string;
    description: string;
    author: string;
    cover: string;
    pages: number;
    size: string;
    link: string;
    categories: mongoose.Types.ObjectId[];
  }) {
    try {
      const newBook = await bookModel.create(bookData);
      return newBook;
    } catch (err) {
      throw err;
    }
  }

  static async getBooksBySearch(searchParam: any) {
    try {
      const isObjectId = mongoose.Types.ObjectId.isValid(searchParam);
      let query;

      if (isObjectId) {
        query = { categories: searchParam };
      } else {
        query = {
          $or: [
            { title: { $regex: searchParam, $options: 'i' } },
            { author: { $regex: searchParam, $options: 'i' } },
          ],
        };
      }

      const books = await bookModel.find(query);
      return books;
    } catch (err) {
      throw err;
    }
  }

  static async getBookById(bookId: any) {
    try {
      const book = await bookModel.findById(bookId);
      return book;
    } catch (err) {
      throw err;
    }
  }

  static async updateBook(
    bookId: any,
    title: string,
    author: string,
    cover: string,
    pages: number,
    size: string,
    link: string,
    categories: mongoose.Types.ObjectId[]
  ) {
    try {
      const book = await bookModel.findByIdAndUpdate(bookId, {
        title: title,
        author: author,
        cover: cover,
        pages: pages,
        size: size,
        link: link,
        categories: categories,
      }, {new: true});
      return book;
    } catch (err) {
      throw err;
    }
  }

  static async getBooksByCategory(categoryId: any) {
    try {
      const books = await bookModel.find({ categories: categoryId });
      return books;
    } catch (err) {
      throw err;
    }
  }

  static async getBooksByTitle(title: string){
    try{
      const query = {
        title: { $regex: title, $options: 'i' }
      };
      const book = await bookModel.find(query)
      return book;
    } catch(err){
      throw err
    }
  }

  static async getBookByAuthor(author: string){
    try{
      const query = {
        author: { $regex: author, $options: 'i' }
      };
      const book = await bookModel.find(query)
      return book;
    } catch(err){
      throw err
    }
  }

  static async getBooksByDescription(keyword: string) {
    try {
      const query = {
        description: { $regex: keyword, $options: 'i' } // Case-insensitive search
      };

      const books = await bookModel.find(query);
      return books;
    } catch (err) {
      throw err;
    }
  }

  static async getRecentlyAddedBooks() {
    try {
      const recentBooks = await bookModel
        .find()
        .sort({ createdAt: -1 })
        .limit(1);
      return recentBooks;
    } catch (err) {
      throw err;
    }
  }

  static async getPopularBooks(){
    try{
      const popularBooks = await bookModel.find().limit(6)
      return popularBooks
    } catch (err) {
      throw err;
    }
  }

  static async deleteBookById(bookId: any) {
    try {
      const book = await bookModel.findByIdAndDelete(bookId);
      return book;
    } catch (err) {
      throw err;
    }
  }
}
