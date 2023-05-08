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

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
 
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not_organic ');
    return output;
}

const overviewfile = fs.readFileSync(`${__dirname}/templates/overview.html` , 'utf8' );
const product  = fs.readFileSync(`${__dirname}/templates/product.html` , 'utf8') ;
const card = fs.readFileSync(`${__dirname}/templates/card.html` , 'utf8') ;

const data  = fs.readFileSync(`${__dirname}/dev-data/data.json` , 'utf8' , )
const productobj = JSON.parse(data);

const server = http.createServer((req , res)=> {
    pathname  = req.url ;
    if(pathname === '/' || pathname === '/overview'){
        const productcard = productobj.map(element => replaceTemplate(card , element) ).join('') ;

        const overview = overviewfile.replace(/{%PRODUCT_Card%}/g , productcard)
        res.end(overview);
    }
    else if(pathname === '/product'){
        res.end('this is product page');
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