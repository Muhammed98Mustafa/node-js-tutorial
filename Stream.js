const fs = require('fs');
const server = require('http').createServer();

server.on('request' , (req, res) => {

    // first solution which is the traditional approach
   /*  const data = fs.readFile('test-file.txt', 'utf8' ,(err , data)=>{
        if(err)  {
            res.statusCode = 404;
          return   res.end('not found!')
        }
        res.end(data)
        
    }); */

    const readiablestream = fs.createReadStream('test-file.txt');
    readiablestream.pipe(res);
     // readableSource.pipe(writeableDest)


   //  the same thing with write steam
     // const writableStream = fs.createWriteStream('output.txt');

})

server.listen(3000 , 'localhost');