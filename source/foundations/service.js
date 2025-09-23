import { FoundationsModel } from "./model/foundations";

export class FoundationsService {
  constructor() {
    this.connection = true; //TODO: POSTGRESQL CONNECTION
  }

  //Deve também ser possível pesquisar os registros existentes através do número do CNPJ
    //Caso a pesquisa encontre resultados, os dados da fundação deverão ser exibidos.
    //Caso o registro não seja encontrado, exibir a mensagem “Fundação não encontrada”
  getFoundations() {}

  //Uma mensagem deverá ser exibida caso o cadastro seja efetuado com sucesso
  createFoundations() {}

  //Uma mensagem deverá ser exibida caso o cadastro seja atualizado com sucesso
  updateFoundations() {}

  //Uma mensagem deverá ser exibida caso o cadastro seja apagado com sucesso
  deleteFoundations() {}
}