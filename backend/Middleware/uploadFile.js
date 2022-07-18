const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "E:/Harshil/Reactjs/loginsystem/backend/upload/");
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()} .jpg`);
    },
  }),
}).single("user_photo");

module.exports = upload;
