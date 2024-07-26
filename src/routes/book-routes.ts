import { Router } from 'express';
import bookController from '../controllers/book-controller';
const router = Router();

router.post('/', bookController.addBook);
router.patch('/:bookId', bookController.editBookInfo);
router.get('/by-category/:categoryId', bookController.booksByCategory);
router.get('/by-id/:bookId', bookController.bookById);
router.get('/recently-added', bookController.recentlyAddedBooks);
router.get('/popular-books', bookController.popularBooks);
router.get('/search/:search', bookController.searchBooks);
router.delete('/:bookId', bookController.deleteBook);

export default router;
