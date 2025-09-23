import FoundationsController from './source/foundations/controller.js';

export class Router {
    constructor() {
        foundationsController = FoundationsController()
    }

    route(url, method) {
        if (url.pathname === '/foundations') return foundationsController.handleRequest(method);
    }
}

