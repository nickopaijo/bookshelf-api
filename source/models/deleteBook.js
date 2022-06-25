const dataBooks = require('../resources/bookData')

const execute = (objData) => {
  dataBooks.splice(objData.indexes, 1)
}

module.exports = { execute }
