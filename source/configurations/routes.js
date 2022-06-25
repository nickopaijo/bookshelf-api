const {
  saveBook,
  getAllBook,
  getBookById,
  editBook,
  deleteBook
} = require('../controllers/bookshelf')
const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: saveBook
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBook
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBook
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBook
  }
]
module.exports = routes
