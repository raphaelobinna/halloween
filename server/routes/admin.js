const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middleware/auth');


const multer = require('multer');

const storage = multer.diskStorage({
        destination: function(req, file, cb) {
                cb(null, 'uploads/')
        },
        filename: function(req, file, cb){
                cb(null, Date.now() + file.originalname )
        }
})

const fileFilter = (req, file, cb) => {
        //reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype ==='image/jpg' ) {
                cb(null, true);
        } else {
                cb(null, false);
        }     
}

const upload = multer({ 
        storage: storage, 
        limits: {
           fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
 })


 router.route('/')//show everything
       // .get(handle.admin)
         .post(auth, handle.createHero);

 router.route('/upload')
         .post(auth, upload.single('pollImage'), handle.saveHeroImage)

 module.exports = router 
