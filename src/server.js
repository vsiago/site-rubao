const https = require('https');
const fs = require('fs');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Carregar certificados
  const options = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem'),
  };

  // Criar o aplicativo Express
  const server = express();

  // Servir arquivos estáticos
  server.use(express.static('public'));

  // Manipular todas as requisições com o Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Iniciar o servidor HTTPS
  https.createServer(options, server).listen(3000, () => {
    console.log('Servidor HTTPS rodando em https://localhost:3000');
  });
});
