// 4.2 解析代码

const parser = require("@babel/parser")

const code = `function add(a,b) { return a +b }`;
const ast = parser.parse(code, {sourceType: "module"});

console.log(JSON.stringify(ast, null, 2));
