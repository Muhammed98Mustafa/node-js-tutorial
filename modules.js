//so we have multiple way to export modules in node js useing module.export or exports
const Calcauter = require('./moulde-test1');

const cal1 = new Calcauter();

console.log(cal1.add(2,3))


const cal2 = require('./module-test2');

console.log(cal2.add(2,3))


// caching 

// the top level code will exucte only once at the frist time then the module will be cached in memory so it will directly call the export module then

require('./module-test3').print();
require('./module-test3').print();
require('./module-test3').print();
