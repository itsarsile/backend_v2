import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100);
        const fileExtension = file.originalname.split(' ').pop();
        cb(null, uniqueSuffix + '.' + fileExtension);
    }
})

export const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5, // 5MB file size limit
      files: 1,
    },
    fileFilter: (req, file, cb) => {
      // Check if the file's MIME type starts with 'image/'
      if (file.mimetype.startsWith('image/')) {
        // Check if the file's extension is either 'jpg' or 'png'
        const fileExtension = file.originalname.split('.').pop();
        if (fileExtension === 'jpg' || fileExtension === 'png') {
          cb(null, true); // Accept the file
        } else {
          cb(new Error('Only JPEG and PNG images are allowed')); // Reject the file
        }
      } else {
        cb(new Error('Only images are allowed')); // Reject the file
      }
    },
  });
  