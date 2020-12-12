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
        host: 'localhost',
        port: '6379',
        password: 'kapi',
      },
    };

    const messageQ = new Queue('message', options);

    messageQ.process(async (job, done) => {
      const result = await DojoApi.post(reqBody);
      console.log(result);
      done();
    });

    return response.json({ message: 'ok' });
  }
}

module.exports = new MessageController();