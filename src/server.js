import express from 'express';
import configViewEngine from './config/viewEngine';
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;
configViewEngine(app);
app.get('/',(req,res) => {
    res.render('index.ejs');
});
app.get('/vd', (req,res) => {
    res.send('<h2>Vd</h2>');
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
