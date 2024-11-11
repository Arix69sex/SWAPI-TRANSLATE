const axios = require('axios');

class Axios {
    api;
    constructor(config) {
        this.api = axios.create(config);
    }

    get(url, config) {
        const result = this.api.get(url, config);
        return result;
    }
    
      post(
        url,
        data,
        config
      ) {
        const result = this.api.post(url, data, config);
        return result;
      }
}

module.exports = Axios;
