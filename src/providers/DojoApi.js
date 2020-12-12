const axios = require('axios');

class DojoApi {
  async post(reqBody) {
    const url = 'https://dojo-api.gateway.linkapi.com.br/v1/simulate'

    const res = await axios.post(url, reqBody, {
      headers: {
        Authorization: 'Basic MDBiNWFlMTBlYzgyNGVjM2JmNjQyOGEzOGM4ODFhYTQ6NWRlZDc3ZjIwZDM0NDc5MjliYmE2Y2RiYWM1ZDc1YjA='
      }
    });

    if (res.data && res.data.approved) {
      const messageUrl = 'https://dojo-api.gateway.linkapi.com.br/v1/message';

      const newReqBody = {
        ...reqBody,
        simulationId: res.data.id
      };

      let messageReponse = await axios.post(messageUrl, newReqBody, {
        headers: {
          Authorization: 'Basic MDBiNWFlMTBlYzgyNGVjM2JmNjQyOGEzOGM4ODFhYTQ6NWRlZDc3ZjIwZDM0NDc5MjliYmE2Y2RiYWM1ZDc1YjA='
        }
      });

      return messageReponse.data;
    } else {
      const errorUrl = 'https://dojo-api.gateway.linkapi.com.br/v1/error-stack';

      const errorBody = {
        id: codigo
      };

      const errorMessage = await axios.post(errorUrl, errorBody, {
        headers: {
          Authorization: 'Basic MDBiNWFlMTBlYzgyNGVjM2JmNjQyOGEzOGM4ODFhYTQ6NWRlZDc3ZjIwZDM0NDc5MjliYmE2Y2RiYWM1ZDc1YjA='
        }
      });

      return errorMessage.data;
    }
  }
}

module.exports = new DojoApi();