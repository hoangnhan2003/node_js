import express from 'express';
import homecontroller from '../controller/homecontroller';
import multer from 'multer';
import path from 'path';
import appRoot from 'app-root-path';


let router = express.Router();
// Define storage location and filename
const storage = multer.diskStorage({
    destination: function (req,res,cb) {
        cb(null,appRoot + "/src/public/image");
    },
    filename: function(req,file,cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


// define type of file can select
    const imageFilter = function (req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

let upload = multer({
    storage: storage,
    fileFilter: imageFilter
})
const initWebRouter = (app) => {
    router.get('',homecontroller.getHomePage);

    router.get('/detail/:TeamName',homecontroller.detailPage);
    router.post('/createNewICPC',homecontroller.createNewICPC);
    router.get('/delete-ICPC/:TeamName',homecontroller.deleteICPC);
    router.get('/edit-ICPC/:TeamName',homecontroller.showEditForm);
    router.post('/update-ICPC',homecontroller.updateICPC);
    router.get('/upload',homecontroller.getUploadFile);
    router.post('/upload-profile-pic',upload.single('profile_pic'),homecontroller.handleUploadFile);
    return app.use('/',router);
} 
export default initWebRouter;
//module.exports = initWebRouter();