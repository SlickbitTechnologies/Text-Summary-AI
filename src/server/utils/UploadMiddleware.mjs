import multer from "multer";
import { getRandomString } from "./utils.mjs";
// import { getRandomString } from "./util.mjs";
const DIR = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, DIR);
  },
  filename: (req, file, callBack) => {
    const fileName =
      getRandomString(12) +
      "_" +
      file.originalname.toLowerCase().split(" ").join("-");
    callBack(null, `${fileName}`);
  },
});
let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    cb(null, true);
  },
});

export default upload;
