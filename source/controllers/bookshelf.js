const { nanoid } = require('nanoid')
const dataBooks = require('../resources/bookData')
const saveBookModel = require('../models/saveBook')
const editBookModel = require('../models/editBook')
const deleteBookModel = require('../models/deleteBook')

const saveBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400)
    return response
  }
  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = pageCount === readPage

  const obj = ({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  })

  saveBookModel.execute(obj)

  const isSuccess = dataBooks.filter((b) => b.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    }).code(201)
    return response
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  }).code(500)
  return response
}

const getAllBook = (request, h) => {
  const { name, reading, finished } = request.query

  let data = dataBooks

  if (name !== undefined) {
    data = data.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
  }

  if (reading !== undefined) {
    if (reading.trim() === '1') {
      data = data.filter((book) => book.reading === true)
    } else if (reading.trim() === '0') {
      data = data.filter((book) => book.reading === false)
    }
  }

  if (finished !== undefined) {
    if (finished.trim() === '1') {
      data = data.filter((book) => book.finished === true)
    } else if (finished.trim() === '0') {
      data = data.filter((book) => book.finished === false)
    }
  }

  const response = h.response({
    status: 'success',
    data: {
      books: data.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  })
  response.code(200)
  return response
}

const getBookById = (request, h) => {
  const { id } = request.params
  const book = dataBooks.filter((b) => b.id === id)[0]

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)

  return response
}

const editBook = (request, h) => {
  const { id } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const updatedAt = new Date().toISOString()
  const indexes = dataBooks.findIndex((b) => b.id === id)

  if (indexes >= 0) {
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      })
      response.code(400)

      return response
    }

    if (pageCount < readPage) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      })
      response.code(400)

      return response
    }

    const finished = pageCount === readPage

    const obj = ({
      indexes,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt
    })

    editBookModel.execute(obj)

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)

    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)

  return response
}

const deleteBook = (request, h) => {
  const { id } = request.params
  const indexes = dataBooks.findIndex((b) => b.id === id)

  if (indexes >= 0) {
    const obj = ({ indexes })
    deleteBookModel.execute(obj)

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)

    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)

  return response
}

module.exports = { saveBook, getAllBook, getBookById, editBook, deleteBook }
