const EventEmmiter = require('events');
const http = require('http');

 const eventemmiter = new EventEmmiter();

 eventemmiter.on('newsales' ,()=> {
    console.log('there is newsales!')
 } )

 eventemmiter.on('newsales' ,()=> {
    console.log('muituple event aciton')
 })

 eventemmiter.on('newsales' ,(num)=> { console.log(`you can also send a veriable i send here ${num}`)})
 eventemmiter.emit('newsales' , 3);

 //=============================================================

 const server = http.createServer();

 server.on('request' , (req, res) =>{
    res.end('new request ');
 })

 server.on('request' , (req, res) =>{
    console.log('onther request 😊')
 });

 server.listen(3000 , 'localhost' , ()=> {
        console.log('server listening on port 3000')
 });