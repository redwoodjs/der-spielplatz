import fs from 'fs';
import path from 'path';
import express from 'express';
import expressLogging from 'express-logging';
import bodyParser from 'body-parser';
import qs from 'qs';
import args from 'args';

const routesAtPath = (searchPath, exts = ['js', 'ts']) => fs
  .readdirSync(searchPath)
  .filter(filename => exts.includes(filename.split('.').pop()))
  .reduce((acc, filename) => {
    const routeName = filename
      .split('.')
      .slice(0, -1)
      .join();
    return {
      [routeName]: path.resolve(path.join(searchPath, filename)),
      ...acc,
    };
  }, {});

args
  .option('port', '', 8910)
  .option('path', 'The path to your lambda functions', './src/functions');

const flags = args.parse(process.argv);
const filesBasePath = path.join(flags.path);

const app = express();
app.use(
  bodyParser.text({
    type: ['text/*', 'application/json', 'multipart/form-data'],
  })
);
app.use(bodyParser.raw({ type: '*/*' }));
app.use(expressLogging(console));

const hostname = `http://localhost:${flags.port}`;
const routes = routesAtPath(filesBasePath);

console.log('\n\nThe following functions are available:');
console.log(
  Object.keys(routes)
    .map(routeName => `- ${hostname}/${routeName}`)
    .join('\n')
);

const parseBody = rawBody => {
  if (typeof rawBody === 'string') {
    return { body: rawBody, isBase64Encoded: false };
  }
  if (rawBody instanceof Buffer) {
    return { body: rawBody.toString('base64'), isBase64Encoded: true };
  }
  return { body: '', isBase64Encoded: false };
};

app.all('/', (req, res) => {
  return res.send(`
    <p>The following functions are available:</p>
    ${Object.keys(routes)
    .map(routeName => `- <a href="/${routeName}">/${routeName}</a>`)
    .join('<br />')}
  `);
});

app.all('/:routeName', (req, res) => {
  const modulePath = routes[req.params.routeName];
  if (!modulePath) {
    console.warn(`route ${req.params.routeName} not found`);
    return res.sendStatus(404);
  }

  const { handler } = require(modulePath);
  if (typeof handler !== 'function') {
    console.warn(`"${modulePath}" does not export a function named "handler"`);
    return res.sendStatus(500);
  }

  const event = {
    httpMethod: req.method,
    headers: req.headers,
    path: req.path,
    queryStringParameters: qs.parse(req.url.split(/\?(.+)/)[1]),
    ...parseBody(req.body), // adds `body` and `isBase64Encoded`
  };

  const handlerCallback = response => (error, { statusCode, body, headers = {} }) => {
    // TODO: Deal with errors
    if (error) {
      console.log('----------');
      console.log(error);
      console.log('----------');
    }

    Object.keys(headers).forEach(header => {
      response.setHeader(header, headers[header]);
    });
    response.statusCode = statusCode;
    return response.end(body);
  };

  // TODO: Add support for promises.
  handler(
    event,
    {}, // TODO: Support context
    handlerCallback(res)
  );
});

app.listen(flags.port, () => console.log(`\n\n⚒ hammer-dev-server on ${hostname}\n\n`));
