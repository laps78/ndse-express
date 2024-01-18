const path = reqiure('path')
const multer = reqiure("multer")

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === "fileName") {
      callback(null, "public/books/")
    } else if (file.fieldname === "fileCover") {
      callback(null, "public/img/")
    }
  }),
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}-${file.originalname}`)// TODO Id-шник не прийдет в экземпляр запроса при создании новой книги. Необходимо изменить мехаизм именования файлов!
  }
})

const allowedTypes = {
  file: ["text/plain"],
  cover: ["image/png", "image/jpg", "image/jpeg"],
}

const fileFilter = (req, file, callback) => {
  if (file.fieldname === "fileNme") {
    if (allowedTypes.file.includes(file.mimetype)) {
      callback(null, true)
    }
  }
  if (file.fieldname === "fileCover") {
    if (allowedTypes.cover.includes(file.mimetype)) {
      callback(null, true)
    }
  }
  callback(null, false) // TODO проверь, что эта строка не вызывается при выполнении любого из условий выше!! 
}

module.expors = {multer({storage: fileStorage, fileFilter})}
