import { FoundationsRepository } from "./repository.js";

export class FoundationsService {
  constructor() {
    this.foudationsRepository = FoundationsRepository();
  }

  async getFoundations(cnpj=null) {
    const foundations = cnpj 
      ? await this.foudationsRepository.findByField('cnpj', cnpj)
      : await this.foudationsRepository.find();

    return foundations;
  }

  async createFoundations(body) {
    const existingFoundation = await this.foudationsRepository.findByField('cnpj', body.cnpj);

    if (!existingFoundation) {
      return this.FoundationsRepository.create(body);
    } else {
      return null;
    }
  }

  async updateFoundations(body) {
    const existingFoundation = await this.foudationsRepository.findByField('id', body.id);

    if (existingFoundation) {
      return this.FoundationsRepository.update(body);
    } else {
      return null;
    }
  }

  async deleteFoundations(id) {
    const existingFoundation = await this.foudationsRepository.findByField('id', id);

    if (existingFoundation) {
      return this.FoundationsRepository.delete(id, 'SOFT_DELETE');
    } else {
      return null;
    }
  }
}