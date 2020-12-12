//const Queue = require('bee-queue');

const Queue = require('bull');

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
        host: 'redis',
        port: '6379',
        password: 'kapi',
      },
    };

    const messageQ = new Queue('message', options);

    messageQ.add(reqBody);

    messageQ.process(async (job, done) => {
      console.log(job.data);
      const result = await DojoApi.post(job.data);
      console.log(result);
      done();
    });

    return response.json({ message: 'ok' });
  }
}

module.exports = new MessageController();