import { FoundationsService } from "./service.js";

export class FoundationsController {
    constructor() {
        this.foundationsService = new FoundationsService()
    }

    async handleRequest(method, params, body, path) {
        //TODO: HANDLE BY URL AND METHOD INSTEAD OF JUST METHOD
        if (method === 'GET' && (path === '' || path === '/')) {
            const foundations = await this.foundationsService.getFoundations();

            if (!foundations) {
                return { code: 404, content: 'Foundation with given CNPJ not found.' };
            }

            return { code: 200, content: foundations };
        }

        if (method === 'GET' && path === '/SOMETHING') { //TODO: DISCOVER HOW TO COMPARE WITH '/___', ANY AMOUNT OF NUMBERS
            const foundations = await this.foundationsService.getFoundations(params.cnpj);

            if (!foundations) {
                return { code: 404, content: 'Foundation with given CNPJ not found.' };
            }

            return { code: 200, content: foundations };
        }

        if (method === 'POST' && path === '') {
            const createdFoundation = await this.foundationsService.createFoundations(body)

            if (createdFoundation) {
                return { code: 201, content: createdFoundation };
            } else {
                return { code: 400, content: 'Already have foundation with given CNPJ' };
            }
        }
        
        if (method === 'PUT' && path === '') {
            const updatedFoundation = await this.foundationsService.updateFoundations(body)

            if (updatedFoundation) {
                return { code: 200, content: updatedFoundation };
            } else {
                return { code: 404, content: 'Foundation with given CNPJ not found.' };
            }
        }

        if (method === 'DELETE' && path === '/SOMETHING') { //TODO: DISCOVER HOW TO COMPARE WITH '/___', ANY AMOUNT OF NUMBERS
            const deletedFoundation = this.foundationsService.deleteFoundations(params.id);

            if (deletedFoundation) {
                return { code: 200, content:  deletedFoundation};
            } else {
                return { code: 404, content: 'Foundation with given CNPJ not found.' };
            }

        }

        return { code: 404, content: 'Resource not found.' }
    }
}

