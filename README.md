<sup><sub>(pt-BR)</sub></sup>
# Desafio Backend
Backend desenvolvido para cumprir com o desafio de desenvolvimento proposto. 

## Introdução
##### Cenário
As Fundações de Apoio são instituições privadas, sem fins lucrativos, que visam dar suporte a projetos de pesquisa, ensino, extensão e de desenvolvimento institucional, científico e tecnológico para as instituições que ela apoia. Geralmente estas instituições são IFES (Instituições Federais de Ensino Superior).

##### Desafio
Crie um formulário para cadastro destas Fundações de Apoio. O formulário deve conter os campos para a fundação inserir o seu nome, CNPJ, e-mail, telefone e a instituição que ela apoia. Uma mensagem deverá ser exibida caso o cadastro seja efetuado com sucesso.
Deve também ser possível pesquisar os registros existentes através do número do CNPJ. Caso a pesquisa encontre resultados, os dados da fundação deverão ser exibidos. Caso o registro não seja encontrado, exibir a mensagem “Fundação não encontrada”.

##### Regras
• O backend da aplicação deve ser escrito em Node.js, PHP ou C#;  
• O código deve ser escrito com o paradigma da programação orientada a objetos;  
• Você não pode utilizar nenhum framework;  
• Você pode usar qualquer outra biblioteca de terceiros que desejar;  
• Crie uma interface minimamente amigável e agradável;  
• O formulário deverá ter as operações de cadastro, consulta, alteração e exclusão de fundações;  
• O formulário não deve permitir o cadastro de mais de uma fundação com o mesmo CNPJ.  


## Solução Proposta
O modelo construído está apresentado na imagem abaixo:
![alt text](assets/documentation/model.png)

##### Backend
Foi construído um backend utilizando Node.js, utilizando um roteador que distribui as chamadas para os devidos controladores (considerando escalabilidade para outros serviços), os quais chamam os serviços onde as regras de negócio estão inseridas. Os serviços, por sua vez, fazem as consultas ao banco de dados por meio dos repositórios, onde as queries estão salvas.

##### Frontend
O frontend foi construído utilizando apenas html puro de acordo com as diretrizes propostas, sendo ele capaz de fazer requisições por meio das funções em javascript.

##### Banco de dados/Conteinerização
Todo o trabalho foi conteinerizado utilizando Docker para facilitar a instalação, o teste e utilização do sistema.

## Como rodar
##### Passo 1 - Clonar o repositório
Utilize o comando ` git clone git@github.com:RafaelSL-37/desafio-conveniar.git `

##### Passo 2 - Instalar o Docker
Faça download do pacote no site ` https://docs.docker.com/get-docker/ `

##### Passo 3 - Construir o docker
Utilize o comando ` docker-compose up --build `

##### Passo 4 - Abrir a aplicação
Abra o arquivo `index.html` que está dentro da pasta `frontend` no seu navegador.

##### Extra - Como rodar a aplicação de testes unitários
Utilize o comando ` node source/foundations/tests/service.test.js `

## Melhoria Possíveis

• Usar um ORM (Object Relational Mapping ou Mapeamento Objeto-Relacional) para operações no banco de dados, fazendo com que essas fiquem mais seguras e padronizadas;  
• Usar alguma forma de autenticação para melhorar a segurança dos dados;  
• Criar ou utilizar alguma forma de geração automática de documentação para acompanhar os contratos de endpoints adicionados.  


-------------------------------------------------------------------------------------------------------------------------------

<sup><sub>(en-US)</sub></sup>
# Backend Challenge
Backend developed to fullfil the challenge proposed of building a system without using frameworks.

## Introduction
##### Setting
Support Foundations are private, non-profit institutions that aim to support research, teaching, outreach, and institutional, scientific, and technological development projects for the institutions they support. These institutions are typically Federal Higher Education Institutions (IFES).

##### Challenge
Create a form to register these Support Foundations. The form should contain fields for the foundation to enter its name, CNPJ (Brazilian Taxpayer Registry), email, phone number and the institution it supports. A message should be displayed if the registration is successful.
It should also be possible to search existing records using the CNPJ number. If the search results are found, the foundation's data should be displayed. If the record is not found, the message "Foundation not found" should be displayed.

##### Rules
• The application backend must be written in Node.js, PHP, or C#;  
• The code must be written using the object-oriented programming paradigm;  
• You cannot use any framework;  
• You can use any third-party library you wish;  
• Create a minimally user-friendly and pleasant interface;  
• The form must have operations for registering, consulting, modifying, and deleting foundations;  
• The form must not allow the registration of more than one foundation with the same CNPJ (Brazilian Taxpayer Registry).


## Proposed Solution
The model used is presented in the image below:
![alt text](assets/documentation/model.png)

##### Backend
The backend was built with Node.js, utilizing a router that distributes calls to the appropriate controllers (considering scalability for other services), which then call the services where the business rules are embedded. The services, in turn, query the database through the repositories where the queries are saved.

##### Frontend
The frontend was built using only pure HTML according to the proposed guidelines, and is capable of making requests through JavaScript functions.

##### Database/Containerization
The whole system was containerized using Docker to facilitate installation, testing and use of the system.

## How to run
##### Step 1 - Clone Repository
Run ``` git clone git@github.com:RafaelSL-37/desafio-conveniar.git ```

##### Step 2 - Install Docker
Get the package on the website ` https://docs.docker.com/get-docker/ `

##### Step 3 - Build Docker
Run ``` docker-compose up --build ```

##### Step 4 - Run the application
Just open the `index.html` file inside the `frontend` folder on your web browser.

##### Extra - How to run the unit test application
Run ` node source/foundations/tests/service.test.js `

## Possible Improvements

• Use an ORM (Object Relational Mapping) for database queries, making it more streamlined and more secure to manipulate data;  
• Use some form of authentication method to improve security on data;  
• Create or use some form of automated documentation generator library to keep track of added endpoint contracts.  