import { FoundationsService } from "./service.js";

export class FoundationsController {
    constructor() {
        this.foundationsService = new FoundationsService()
    }

    async handleRequest(method, params, body, path) {
        if (method === 'GET') {
            const withDeleted = params.withDeleted || false;
            if (params.cnpj) {
                const foundations = await this.foundationsService.getFoundations(params.cnpj, withDeleted);

                if (!foundations) {
                    return { code: 404, content: 'Foundation with given CNPJ not found.' };
                }

                return { code: 200, content: foundations };
            } else {
                const foundations = await this.foundationsService.getFoundations(null, withDeleted);
    
                if (!foundations) {
                    return { code: 404, content: 'No foundation was found.' };
                }
    
                return { code: 200, content: foundations };
            }
        }

        if (method === 'POST') {
            const createdFoundation = await this.foundationsService.createFoundations(body)

            if (createdFoundation) {
                return { code: 201, content: createdFoundation };
            } else {
                return { code: 400, content: 'CNPJ already in database.' };
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
            if (!params.id) return { code: 400, content: 'No CNPJ was given for deletion.' };

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

