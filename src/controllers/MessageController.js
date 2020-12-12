const Queue = require('bee-queue');

const DojoApi = require('../providers/DojoApi');

class MessageController {
  async send(request, response) {
    const { codigo, produtos } = request.body;

    const reqBody = {
      id: codigo,
      itens: produtos.map(produto => {
        return {
          name: produto.nome,
          id: produto.codigo,
          price: produto.preco
        };
      })
    };

    const options = {
      removeOnSuccess: true,
      redis: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
      },
    };

    const messageQ = new Queue('message', options);

    messageQ.process((job, done) => {
      await DojoApi.post(reqBody);

      done();
    });

    return response.json({ message: 'ok' });
  }
}

module.exports = new MessageController();