import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
  cover: {
    type: String,
    default: 'cover.png'
  },
  pages: {
    type: Number
  },
  size: {
    type: String
  },
  downloads: {
    type: Number,
  },
  link: {
    type: String,
    default: 'link.co'
  },
  categories: [mongoose.Types.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const bookModel = mongoose.model('Book', bookSchema)
export default bookModel;
