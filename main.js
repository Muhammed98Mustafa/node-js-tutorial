const { error } = require('console');
const fs = require('fs');


// sayn action
/* const data = fs.readFileSync('./txt/final.txt'  , 'utf8' );


fs.writeFileSync('./txt/output.txt', data);
console.log("the file is written!") */

// async action 

fs.readFile('./txt/start    .txt' , 'utf8' , (err , data )=>{
    if(err) return console.log('data does not send sorry!')
    fs.readFile(`./txt/${data}.txt` , 'utf8' , (err, data1)=>{
        fs.writeFile('./txt/final.txt', data1,  (err)=>{
            console.log("data is send ")
        });
    })
} );
