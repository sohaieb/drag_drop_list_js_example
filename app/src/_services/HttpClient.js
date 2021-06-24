let singleton;

class HttpClient {
    #requestConfig;
    #request;

    constructor({url = 'https://jsonplaceholder.typicode.com/photos', method = 'GET', headers = {}, body = null, limit= null} = {}) {
        this.#requestConfig = {
            url,
            method
        };
        if(limit){
            this.#requestConfig.url += '?_start=0&_limit='+limit;
        }
        if (body) {
            this.#requestConfig.body = body;
        }
        this.#request = fetch(this.#requestConfig.url, {...this.#requestConfig});
    }

    jsonResponse() {
        return this.#request.then(
            response => {
                if (this.#isErrorResponse(response.status)) {
                    throw new Error('Server error');
                }
                return response.clone().json();
            }
        ).catch(error => {
            throw error;
        });
    }

    #isErrorResponse(status) {
        return +((status / 100).toFixed(0)) !== 2;
    }
}

/**
 * Singleton http service
 *
 * @param config
 * @return {*}
 */
export default function (config) {
    if (singleton) {
        return singleton;
    }
    singleton = new HttpClient(config);
    return singleton;
}
