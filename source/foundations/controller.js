import FoundationsRepository from './repository'

export class FoundationsController {
    constructor() {
        foundationsRepository = FoundationsRepository()
    }

    async handleRequest(method, params, body) {
        if (method === 'GET') {
            const foundations = cnpj
                ? foundationsRepository.getFoundations(cnpj)
                : foundationsRepository.getFoundations();

            if (!foundations) {
                return {code: 404, content: 'Foundation with given CNPJ not found.'};
            }

            return {code: 200, content: foundations};
        }

        if (method === 'POST') {
            if (foundationsRepository.getFoundations(body.cnpj)) {
                return {code: 400, content: 'Already have foundation with given CNPJ'};
            }

            return {code: 201, content: foundationsRepository.createFoundations(body)};
        }
        
        if (method === 'PUT') {
            if (!foundationsRepository.getFoundations(body.cnpj)) {
                return {code: 404, content: 'Foundation with given CNPJ not found.'};
            }

            return {code: 200, content: foundationsRepository.updateFoundations(body)};
        }

        if (method === 'DELETE') {
            const foundation = await foundationsRepository.getFoundations(header.cnpj);
            if (!foundation) {
                return {code: 404, content: 'Foundation with given CNPJ not found.'};
            }

            return {code: 200, content: foundationsRepository.deleteFoundations(header.cnpj)};
        }

        return {code: 404, content: 'Resource not found.'}
    }
}

