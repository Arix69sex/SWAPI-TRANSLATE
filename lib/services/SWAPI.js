const Axios = require('./Axios');

class SWAPI {
    request;
    constructor() {
        this.request = new Axios({
            baseURL: "https://swapi.py4e.com/api/",
            headers: {},
        });
    }

    async getPeople() {
        const response = await this.request.get("people", {})
        
        if (!response.data.results) {
            throw new Error("Error getting people");
          }
    
        return response.data.results;
    }
}

module.exports = SWAPI;
