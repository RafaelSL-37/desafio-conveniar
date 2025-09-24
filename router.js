import { FoundationsController } from './source/foundations/controller.js';

export class Router {
    constructor() {
        this.foundationsController = new FoundationsController();
    }

    async route(urlData, method, body) {
        if (urlData.pathname.startsWith('/foundations')) {
            return this.foundationsController.handleRequest(
                method, 
                urlData.query, 
                body, 
                urlData.pathname.replace('/foundations', "")
            );
        }
    }
}

