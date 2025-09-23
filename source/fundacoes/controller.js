import FundacoesService from './source/fundacoes/service.js';

export class FundacoesController {
    constructor() {
        fundacoesService = FundacoesService()
    }

    handleRequest(method) {
        if (method === 'GET') return fundacoesService.getFundacoes();
        if (method === 'POST') return fundacoesService.createFundacoes();
        if (method === 'PUT') return fundacoesService.updateFundacoes();
        if (method === 'DELETE') return fundacoesService.deleteFundacoes();

        return 'Não foi encontrada rota disponível para a requisição feita.'
    }
}

