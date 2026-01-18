// caller.js
window = global;
eval(require('fs').readFileSync('pagination11.js', 'utf8'));

const page = parseInt(process.argv[2]) || 1;

loadPage(page)
    .then(result => console.log(JSON.stringify(result)))
    .catch(error => {
        console.log(JSON.stringify({error: error.message}));
        process.exit(1);
    });