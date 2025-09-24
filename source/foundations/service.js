import { FoundationsRepository } from "./repository.js";

export class FoundationsService {
  constructor() {
    this.foundationsRepository = new FoundationsRepository();
  }

  async getFoundations(cnpj=null) {
    const foundations = cnpj 
      ? await this.foundationsRepository.findByField('cnpj', cnpj)
      : await this.foundationsRepository.find();

    return foundations;
  }

  async createFoundations(body) {
    const existingFoundation = await this.foundationsRepository.findByField('cnpj', body.cnpj);

    if (!existingFoundation) {
      return this.foundationsRepository.create(body);
    } else {
      return null;
    }
  }

  async updateFoundations(body) {
    const existingFoundation = await this.foundationsRepository.findByField('id', body.id);

    if (existingFoundation) {
      return this.foundationsRepository.update(body);
    } else {
      return null;
    }
  }

  async deleteFoundations(id) {
    const existingFoundation = await this.foundationsRepository.findByField('id', id);

    if (existingFoundation) {
      return this.foundationsRepository.delete(id, 'SOFT_DELETE');
    } else {
      return null;
    }
  }
}