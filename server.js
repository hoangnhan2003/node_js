const http = require('http');

const server = http.createServer((req,res) => {
    console.log('run request');
    res.setHeader('Content-Type','text/html');
    res.write('<h3>Test hello</h3>');
    res.write('<h4 style = "color: red">hi</h4>');
    res.end();
})
server.listen(3000,'localhost', () => {
    console.log('Node js server run on port 3000');
})