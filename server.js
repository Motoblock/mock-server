
const jsonServer = require('json-server');
const catalog = require('./db/catData.json');

const PORT = 3000;

const db = {
  catalog: catalog
};

const server = jsonServer.create();
const router = jsonServer.router(db);

server.use(jsonServer.defaults({ static: __dirname + '/public' }));

server.use(jsonServer.defaults({ readOnly: true }));

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(  
  jsonServer.rewriter({ '/api/*': '/$1', })
);

server.use(router);

server.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });

  module.exports = server;