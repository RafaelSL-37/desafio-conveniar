import FundacoesController from './source/fundacoes/controller.js';

export class Router {
    constructor() {
        fundacoesController = FundacoesController()
    }

    route(res, url, method) {
        if (url === '/service') {            
            page = fundacoesController.handleRequest(method);

            res.write(page);
            res.end();
        }
    }
}

