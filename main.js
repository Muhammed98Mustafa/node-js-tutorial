const { error } = require('console');
const fs = require('fs');
const http = require('http');
const { json } = require('stream/consumers');
const url = require('url');


// sayn action
/* const data = fs.readFileSync('./txt/final.txt'  , 'utf8' );


fs.writeFileSync('./txt/output.txt', data);
console.log("the file is written!") */

// async action 

/* fs.readFile('./txt/start    .txt' , 'utf8' , (err , data )=>{
    if(err) return console.log('data does not send sorry!')
    fs.readFile(`./txt/${data}.txt` , 'utf8' , (err, data1)=>{
        fs.writeFile('./txt/final.txt', data1,  (err)=>{
            console.log("data is send ")
        });
    })
} ); */

const replaceTemplate = require('./module/replaceTemplate');

const overviewfile = fs.readFileSync(`${__dirname}/templates/overview.html` , 'utf8' );
const product  = fs.readFileSync(`${__dirname}/templates/product.html` , 'utf8') ;
const card = fs.readFileSync(`${__dirname}/templates/card.html` , 'utf8') ;

const data  = fs.readFileSync(`${__dirname}/dev-data/data.json` , 'utf8' , )
const productobj = JSON.parse(data);

const server = http.createServer((req , res)=> {
    const {pathname , query} = url.parse(req.url, true);
   
    if(pathname === '/' || pathname === '/overview'){
        const productcard = productobj.map(element => replaceTemplate(card , element) ).join('') ;

        const overview = overviewfile.replace(/{%PRODUCT_Card%}/g , productcard)
        res.end(overview);
    }
    else if(pathname === '/product'){
    res.writeHead(200, {'Content-Type': 'text/html'})
    const oneporuct = productobj[query.id]
    const output = replaceTemplate(product , oneporuct);
    res.end(output);
   
  
       
    }
    else if(pathname === '/api'){
        res.writeHead(200, {
            'content-type': 'application/json' 
        })
        res.end(data);
    }
    else {
        res.writeHead(404 , {
            'Content-Type': 'text/html' ,
            'my-own-header': 'page not found!'
        }) 
        res.end('<h1>404 Not Found</h1>')
    }
})
server.listen(3000 , 'localhost' , ()=>{
    console.log('listening on port 3000');
})

