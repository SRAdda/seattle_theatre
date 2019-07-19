var http = require("http"), fs = require('fs');

http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    case '/': 
      fs.readFile('public/home.html', (err, data) => {
        if (err) return console.error(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data.toString());
      });
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Page not found.');
      break;
  }
  
}).listen(process.env.PORT || 3000, function() {
  console.log('Server started on port: 3000');
});
