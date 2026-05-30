import multer from "multer";

const upload = multer({
  // Keep files in memory because ImageKit receives the buffer directly.
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,//5MB limit
  },
});


export default upload
