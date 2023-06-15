import connection from "../config/connectDB";
let getAllResult = async (req,res) => {
    const [rows,fields] = await connection.execute("Select * from `icpc`");
    console.log("data: ", rows);
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
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
    if(!TeamName || !UniversityName || !ProblemId || !Time || !Result){
        return res.status(200).json({
            message: 'missing data params!'
        });
    }
    await connection.execute('insert into icpc (TeamName,UniversityName,ProblemId,Time,Result) values (?,?,?,?,?)',
    [TeamName,UniversityName,ProblemId,timeInt,Result]);
    console.log('Add success');
    return res.status(200).json({
        message: 'Create successful!',
    })
 }
 let deleteICPC = async (req,res) => {
    await connection.execute('delete from icpc where TeamName = ?',[req.params.TeamName]);
    console.log('Deleted!!!!');
    return res.status(200).json({
        message: 'Deleted icpc have TeamName = '+req.params.TeamName
    });
 }
 
 let updateICPC = async (req,res) => {
    let {TeamName,UniversityName,ProblemId,Time,Result} = req.body;
    console.log('TeamName:',TeamName);
    console.log('UniversityName',UniversityName);
    console.log('ProblemId ',ProblemId);
    console.log('Time ', Time);
    console.log('Result ', Result);
    if(!TeamName || !UniversityName || !ProblemId || !Time || !Result){
        return res.status(200).json({
            message: 'missing data params!'
        });
    }
    await connection.execute('update icpc set UniversityName = ?,ProblemId = ?,Time = ?,Result = ? where TeamName = ?',
    [UniversityName,ProblemId,Time,Result,TeamName]);
    console.log('update successful!');
    return res.status(200).json({
        message:'Update successful'
    });
 }
module.exports = {
    getAllResult,createNewICPC,updateICPC,deleteICPC
}