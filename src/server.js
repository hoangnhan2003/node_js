import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRouter from './route/web';
import initAPIRouter from './route/api';
require('dotenv').config(); // import environment file (.env) 
const app = express();
const port = process.env.PORT || 8080;

// config để có thể lấy thông tin từ body trong request
app.use(express.urlencoded({extended:true}));
app.use(express.json());    
//set up view engine
configViewEngine(app);

// init web router
initWebRouter(app);

// init api router
initAPIRouter(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
