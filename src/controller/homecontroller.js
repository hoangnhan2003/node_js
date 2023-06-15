import { parse } from "dotenv";
import connection from "../config/connectDB";
import multer from 'multer';
let getHomePage = async (req,res) => {
    // logic
    // connection.query(
    //     'SELECT * FROM `icpc` ',
    //    async function(err, results, fields) {
            // console.log('data:');
            // console.log(results); // results contains rows returned by server
    //     return res.render('index.ejs',{dataUser: rows});
    //     }
    //   );
    const [rows,fields] = await connection.execute("Select * from `icpc`");
    console.log("data: ", rows);
    return res.render('index.ejs',{dataUser:rows});

 }
 let detailPage = async (req,res) => {
    const [rows,fields] = await connection.execute("select * from `icpc` where TeamName = ?",[req.params.TeamName]);
    console.log(rows);
    return res.render('detail.ejs',{data: rows})
 }
 let createNewICPC = async (req,res) => {
    let {TeamName,UniversityName,ProblemId,Time,Result} = req.body;
    console.log('Body request: ' , req.body);
    console.log('TeamName:',TeamName);
    console.log('UniversityName',UniversityName);
    console.log('ProblemId ',ProblemId);
    console.log('Time ', Time);
    console.log('Result ', Result);
    const timeInt = parseInt(Time);
    await connection.execute('insert into icpc (TeamName,UniversityName,ProblemId,Time,Result) values (?,?,?,?,?)',
    [TeamName,UniversityName,ProblemId,timeInt,Result]);
    console.log('Add success');
    res.redirect('/');
 }
 let deleteICPC = async (req,res) => {
    await connection.execute('delete from icpc where TeamName = ?',[req.params.TeamName]);
    console.log('Deleted!!!!');
    res.redirect('/');
 }
 let showEditForm = async (req,res) => {
    const[icpc,fields] = await connection.execute("select * from icpc where TeamName = ?",[req.params.TeamName]);
    console.log('ICPC: ',icpc[0]);
    return res.render('update.ejs',{data:icpc[0]});
 }
 let updateICPC = async (req,res) => {
    let {TeamName,UniversityName,ProblemId,Time,Result} = req.body;
    console.log('TeamName:',TeamName);
    console.log('UniversityName',UniversityName);
    console.log('ProblemId ',ProblemId);
    console.log('Time ', Time);
    console.log('Result ', Result);
    await connection.execute('update icpc set UniversityName = ?,ProblemId = ?,Time = ?,Result = ? where TeamName = ?',
    [UniversityName,ProblemId,Time,Result,TeamName]);
    console.log('update successful!');
    return res.redirect('/');
 }
 let getUploadFile = async (req,res) => {
   return res.render('uploadFile.ejs');
 }
 
 const upload = multer().single('profile_pic')
 let handleUploadFile = async (req,res) => {
   upload(req,res, (err) => {
      if(req.fileValidationError) {
         return res.send(req.fileValidationError);
      }
      else if (!req.file){
         return res.send('Please select an image to upload');
      }
      else if(err instanceof multer.MulterError){
         return res.send(err);
      }
      else if(err){
         return res.send(err);
      }
      // Display uploaded image for user validation
      res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
   })
 }
module.exports = {
    getHomePage,
    detailPage,
    createNewICPC,
    deleteICPC,
    showEditForm,
    updateICPC,
    getUploadFile,
    handleUploadFile
}