export class FundacoesService {
  constructor() {
    this.connection = connection; //TODO: POSTGRESQL CONNECTION
  }

  //Deve também ser possível pesquisar os registros existentes através do número do CNPJ
    //Caso a pesquisa encontre resultados, os dados da fundação deverão ser exibidos.
    //Caso o registro não seja encontrado, exibir a mensagem “Fundação não encontrada”
  getFundacoes() {}

  //Uma mensagem deverá ser exibida caso o cadastro seja efetuado com sucesso
  createFundacoes() {}

  //Uma mensagem deverá ser exibida caso o cadastro seja atualizado com sucesso
  updateFundacoes() {}

  //Uma mensagem deverá ser exibida caso o cadastro seja apagado com sucesso
  deleteFundacoes() {}
}