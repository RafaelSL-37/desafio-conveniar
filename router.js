import { FoundationsController } from './source/foundations/controller.js';

export class Router {
    constructor() {
        foundationsController = FoundationsController()
    }

    async route(url, method, body) {
        if (url.pathname.startsWith('/foundations')) {
            const params = getParams(url.pathname);
            return foundationsController.handleRequest(method, params, body);
        }
    }

    getParams(path){
        const splitPath = path.split('?');
        const params = {};

        if (splitPath.length == 0) return params;

        const keyValuePairs = splitPath[1].split('&');

        return params.array.forEach(keyValuePair => {
            const { key, value } = keyValuePair.split('=');
            params[key] = value;
        });
    }
}

