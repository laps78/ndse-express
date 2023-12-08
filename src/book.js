class Book {
  constructor(
    id = uuid(),
    title = "",
    description = "",
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = ""
  ) { 
    this.id = id
    this.title = title
    this.desc = desc
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
  }
}

module.exports = Book