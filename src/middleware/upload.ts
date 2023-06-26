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
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        const fileExtension = file.originalname.split('.').pop();
        if (fileExtension === 'jpg' || fileExtension === 'png') {
          cb(null, true);
        } else {
          cb(new Error('Only JPEG and PNG images are allowed'));
        }
      } else {
        cb(new Error('Only images are allowed'));
      }
    },
    limits: {
      fileSize: 1024 * 1024 * 2,
      files: 1,
    },
    
  });
  