// Blocking, synchronous way

const fs = require('fs');
const http = require('http');
const { default: slugify } = require('slugify');
const url = require('url');
const clugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

const textIn = fs.readFileSync('./txt/Input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is a test: ${textIn} \n on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);

// Non-blocking asychronous way
fs.readFile('./txt/start.txt', (err, data) => {
  if (err) return console.log('ERROR');

  console.log(data);

  fs.writeFile('./txt/final2.txt', 'mytest', 'utf-8', (err) => {});
});

console.log('will read file');

//Only read once at start, so we used Sync version

//SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCards = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
// Create Server
const server = http.createServer((req, res) => {
  //routing

  const { query, pathname } = url.parse(req.url, true);
  //const pathName = req.url;
  // console.log(req.url, pathName);

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCards, el)).join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
  } else if (pathname === '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);

    //res.end("This is API");
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Hello world!',
    });
    res.end('<h1> Page not found </h1>');
  }

  //console.log(req);
  //res.end("Helo from the server!");
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
