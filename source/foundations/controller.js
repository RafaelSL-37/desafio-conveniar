import FoundationsService from './source/foundations/service.js';

export class FoundationsController {
    constructor() {
        foundationsService = FoundationsService()
    }

    handleRequest(method) {
        if (method === 'GET') return foundationsService.getFoundations();

        if (method === 'POST') {
            //TODO: CHECK IF EXISTS. 
                // IF IT DOES, UPDATE
                // IF IT DOESNT, CREATE
            return foundationsService.createFoundations(); 
        }
        
        if (method === 'PUT') return foundationsService.updateFoundations();
        
        if (method === 'DELETE') return foundationsService.deleteFoundations();

        return 'Não foi encontrada rota disponível para a requisição feita.'
    }
}

