import FundacoesController from './source/fundacoes/controller.js';

export class Router {
    constructor() {
        fundacoesController = FundacoesController()
    }

    route(url, method) {
        if (url === '/service') return fundacoesController.handleRequest(method);
    }
}

