// 4.2 解析代码

const parser = require("@babel/parser")

const code = `function add(a,b) { return a +b }`;
const ast = parser.parse(code, {sourceType: "module"});

// console.log(JSON.stringify(ast, null, 2));


// 4.3 遍历 AST
const traverse = require("@babel/traverse").default;

// 遍历过程中，如果遇到FunctionDeclaration类型，就将path传入，对path进行处理
traverse(ast, {
    FunctionDeclaration(path){
        console.log("函数名：", path.node.id.name)
    }
})
