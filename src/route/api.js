import express from 'express';
import APIController from '../controller/APIController';


let router = express.Router();

const initAPIRouter = (app) => {
    router.get('',APIController.getAllResult);

     router.post('/createICPC',APIController.createNewICPC);
     router.delete('/delete-ICPC/:TeamName',APIController.deleteICPC);
     router.post('/update-ICPC',APIController.updateICPC);
    return app.use('/api',router);
} 
export default initAPIRouter;
//module.exports = initWebRouter();