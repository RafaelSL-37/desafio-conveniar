import { FoundationsService } from "./service.js";

export class FoundationsController {
    constructor() {
        this.foundationsService = FoundationsService()
    }

    async handleRequest(method, params, body) {
        //TODO: HANDLE BY URL AND METHOD INSTEAD OF JUST METHOD
        if (method === 'GET') {
            const foundations = params.cnpj
                ? await this.foundationsService.getFoundations(params.cnpj)
                : await this.foundationsService.getFoundations();

            if (!foundations) {
                return { code: 404, content: 'Foundation with given CNPJ not found.' };
            }

            return { code: 200, content: foundations };
        }

        if (method === 'POST') {
            const createdFoundation = await this.foundationsService.createFoundations(body)

            if (createdFoundation) {
                return { code: 201, content: createdFoundation };
            } else {
                return { code: 400, content: 'Already have foundation with given CNPJ' };
            }
        }
        
        if (method === 'PUT') {
            const updatedFoundation = await this.foundationsService.updateFoundations(body)

            if (updatedFoundation) {
                return { code: 200, content: updatedFoundation };
            } else {
                return { code: 404, content: 'Foundation with given CNPJ not found.' };
            }
        }

        if (method === 'DELETE') {
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

