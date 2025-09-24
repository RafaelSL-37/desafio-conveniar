import { FoundationsRepository } from "./repository";

export class FoundationsService {
  constructor() {
    this.foudationsRepository = FoundationsRepository();
  }

  async getFoundations(cnpj) {
    const foundations = cnpj 
      ? await this.foudationsRepository.findByCnpj(cnpj)
      : await this.foudationsRepository.find();

    return foundations;
  }

  async createFoundations(body) {
    const existingFoundation = await this.foudationsRepository.findByCnpj(cnpj);

    if (!existingFoundation) {
      return this.FoundationsRepository.create(body);
    } else {
      return null;
    }
  }

  async updateFoundations(body) {
    const existingFoundation = await this.foudationsRepository.findByCnpj(cnpj);

    if (existingFoundation) {
      return this.FoundationsRepository.update(body);
    } else {
      return null;
    }
  }

  async deleteFoundations(cnpj) {
    const existingFoundation = await this.foudationsRepository.findByCnpj(cnpj);

    if (existingFoundation) {
      return this.FoundationsRepository.delete(body);
    } else {
      return null;
    }
  }
}