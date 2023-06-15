// get the client
import mysql from 'mysql2/promise';

// create the connection to database
console.log('create pool :');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'hnhan2003@235',
  database: 'study'
});
// let data = [];
// connection.query(
//     'SELECT * FROM `icpc` ',
//     function(err, results, fields) {
//         console.log('data:');
//         console.log(results); // results contains rows returned by server
//     data = results;
//     console.log('Exit connection')
//     console.log(data);    
//     }
//   );
//   console.log("Log result: ");
  // const [rows,fields] = await connection.execute("Select * from `icpc`");
  
export default connection;
