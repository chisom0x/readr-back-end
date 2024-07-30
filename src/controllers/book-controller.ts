import { Request, Response } from 'express';
import bookService from '../services/books-service';
import categoryService from '../services/category-service';
import mongoose from 'mongoose';
import bookModel from 'models/book-model';

export default class bookController {
  static async addBook(req: Request, res: Response) {
    try {
      const {
        title,
        author,
        description,
        pages,
        cover,
        size,
        link,
        categories,
      } = req.body;

      const newBook = await bookService.createBook({
        title,
        author,
        description,
        pages,
        cover,
        size,
        link,
        categories,
      });

      res.status(200).json({
        status: true,
        message: 'successful',
        data: newBook,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }

  static async bookById(req: Request, res: Response) {
    try {
      const bookId = req.params.bookId;
      if (!bookId)
        return res.status(400).json({
          status: false,
          message: 'please provide a book id',
          data: null,
        });
      const book = await bookService.getBookById(bookId);
      if (!book)
        return res.status(400).json({
          status: false,
          message: 'invalid book id',
          data: null,
        });
      res.status(200).json({
        status: true,
        message: 'successful',
        data: {
          cover: book.cover,
          title: book.title,
          author: book.author,
          pages: book.pages,
          size: book.size,
          description: book.description,
          downloadLink: book.link,
          save: 'save_link'
        },
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }

  static async booksByCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId;
      if (!categoryId)
        return res.status(400).json({
          status: false,
          message: 'please provide a category id',
          data: null,
        });
      const newCategoryId = new mongoose.Types.ObjectId(categoryId);

      const books = await bookService.getBooksByCategory(newCategoryId);
      if (!books)
        return res.status(400).json({
          status: false,
          message: 'invalid category id',
          data: null,
        });
        let data = []
        for(const book of books){
           data.push({
             cover: book.cover,
             title: book.title,
             pages: book.pages,
             size: book.size,
             author: book.author
           })
        }
      res.status(200).json({
        status: true,
        message: 'successful',
        data: data,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }

  static async editBookInfo(req: Request, res: Response) {
    try {
      const bookId = req.params.bookId;
      if (!bookId)
        return res.status(400).json({
          status: false,
          message: 'please provide a book id',
          data: null,
        });
      const { title, author, pages, cover, size, link, categories } = req.body;

      const updatedBook = await bookService.updateBook(
        bookId,
        title,
        author,
        cover,
        pages,
        size,
        link,
        categories
      );

      res.status(200).json({
        status: true,
        message: 'successful',
        data: updatedBook,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }

  static async recentlyAddedBooks(req: Request, res: Response) {
    try {
      const books = await bookService.getRecentlyAddedBooks();
      res.status(200).json({
        status: true,
        message: 'successful',
        data: books,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }

  static async deleteBook(req: Request, res: Response) {
    try {
      const bookId = req.params.bookId;
      await bookService.deleteBookById(bookId);
      res.status(200).json({
        status: true,
        message: 'successful',
        data: null,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }

  static async searchBooks(req: Request, res: Response) {
    try {
      const search = req.params.search;

      if (!search)
        return res.status(400).json({
          status: false,
          message: 'please provide a search query',
          data: null,
        });

      let result: any[] = [];

      const titleResponse = await bookService.getBooksByTitle(search);
      if (titleResponse.length >= 1) {
        titleResponse.map((response) => {
          result.push(response);
        });
      }

      const category = await categoryService.getCategoryByName(search);
      if (category) {
        const categoryId = category._id;
        const bookCategoryResponse = await bookService.getBooksByCategory(
          categoryId
        );
        if (bookCategoryResponse.length >= 1) {
          bookCategoryResponse.map((response) => {
            result.push(response);
          });
        }
      }

      const authorResponse = await bookService.getBookByAuthor(search);
      if (authorResponse.length >= 1) {
        authorResponse.map((response) => {
          result.push(response);
        });
      }

      const descriptionResponse = await bookService.getBooksByDescription(
        search
      );
      if (descriptionResponse.length >= 1) {
        descriptionResponse.map((response) => {
          result.push(response);
        });
      }

      res.json(result);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }

  static async popularBooks(req: Request, res: Response) {
    try {
      const popularBooks = await bookService.getPopularBooks();
      let data = [];
      for (const book of popularBooks) {
        data.push({
          cover: book.cover,
          title: book.title,
          bookId: book._id,
        });
      }
      return res.status(200).json({
        status: true,
        message: 'successful',
        results: popularBooks.length,
        data: data,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }

  static async webDevBooks(req: Request, res: Response) {
    try {
      const webDevBooks = await bookService.getWebDevBooks();
      let data = [];
      for (const book of webDevBooks) {
        data.push({
          cover: book.cover,
          title: book.title,
          bookId: book._id,
        });
      }
      return res.status(200).json({
        status: true,
        message: 'successful',
        results: webDevBooks.length,
        data: data,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: 'something went wrong!', data: null });
    }
  }
}
