import multer from "multer";
import { SystemError } from "../../utils/systemError.js";

const fileUpload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    console.log(file);
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new SystemError("Only image format allowed!", 400), false);
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
  });
  return upload;
};

export default fileUpload;
