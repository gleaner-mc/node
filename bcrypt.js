let bcrypt = require('bcrypt');

let password = 'alex123';
 
// 加密 
var hash = bcrypt.hashSync(password,10);
console.log('加了盐',hash)

// 校验 
let bl = bcrypt.compareSync(password,hash); 
// true|false

console.log('校验',bl)