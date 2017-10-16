const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();


app.prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json()); // to support JSON-encoded bodies
    server.use(bodyParser.urlencoded({ // to support URL-encoded bodies
      extended: true,
    }));

    server.get('/detail', (req, res) => {
      const actualPage = '/detail';
      const queryParams = { id: req.query.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/detail/:id', (req, res) => {
      const actualPage = '/detail';
      const queryParams = { id: req._parsedUrl.path.replace('/detail/', '') };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`); //eslint-disable-line
    });
  })
  .catch((ex) => {
    console.error(ex.stack); //eslint-disable-line
    process.exit(1);
  });
