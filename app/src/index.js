import express from 'express';
import nunjucks from 'nunjucks';
import routes from './routes.js';

const server = express();

// Configurar pasta publica
server.use(express.static('src'));

// Habilitar o server para usar as rotas
server.use(routes);

// Utilizando `Template Engine`
nunjucks.configure('src/views/', {
  express: server,
  noCache: true,
});

// 404 - NOT FOUND
server.use((req, res, next) => {
  res.render('not-found.html');
  next(false);
});

// Ligar o servidor:
server.listen(3001, () => console.log('🔥[FRONT-END] started at: http://localhost:3001'));
