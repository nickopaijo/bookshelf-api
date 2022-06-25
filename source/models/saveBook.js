const dataBooks = require('../resources/bookData')

const execute = (objData) => {
  const id = objData.id
  const name = objData.name
  const year = objData.year
  const author = objData.author
  const summary = objData.summary
  const publisher = objData.publisher
  const pageCount = objData.pageCount
  const readPage = objData.readPage
  const finished = objData.finished
  const reading = objData.reading
  const insertedAt = objData.insertedAt
  const updatedAt = objData.updatedAt

  dataBooks.push({ id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt })
}

module.exports = { execute }
