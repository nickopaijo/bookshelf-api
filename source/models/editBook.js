const dataBooks = require('../resources/bookData')

const execute = (objData) => {
  const index = objData.indexes
  const name = objData.name
  const year = objData.year
  const author = objData.author
  const summary = objData.summary
  const publisher = objData.publisher
  const pageCount = objData.pageCount
  const readPage = objData.readPage
  const finished = objData.finished
  const reading = objData.reading
  const updatedAt = objData.updatedAt

  dataBooks[index] = { ...dataBooks[index], name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt }
}

module.exports = { execute }
