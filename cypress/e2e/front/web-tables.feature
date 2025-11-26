# language: pt
@ui
Funcionalidade: Elements - Web Tables

  Cenário: Elements - Cenário 3 - Deve criar, editar e deletar um registro na Web Table
    Dado que eu acesse a página Web Tables
    Quando eu criar um novo registro na Web Table
    Então o novo registro deve ser exibido na Web Table
    Quando eu editar o registro criado na Web Table
    Então o registro editado deve ser exibido na Web Table
    Quando eu deletar o registro criado na Web Table
    Então o registro não deve mais ser exibido na Web Table

  Cenário: Elements - Cenário 4 - Deve criar e deletar 12 registros dinamicamente na Web Table
    Dado que eu acesse a página Web Tables
    Quando eu criar 12 novos registros válidos na Web Table
    Então todos os novos registros devem ser exibidos na Web Table
    Quando eu deletar todos os novos registros criados na Web Table
    Então nenhum dos novos registros deve ser exibido na Web Table


