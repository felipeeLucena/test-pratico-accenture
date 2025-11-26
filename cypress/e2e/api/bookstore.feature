# language: pt
@api
Funcionalidade: Fluxo de reserva de livros via API

  Cenário: Deve criar um usuário com sucesso
    Quando eu criar um novo usuário válido
    Então o usuário deve ser criado com sucesso

  Cenário: Deve gerar um token de acesso válido
    Dado que exista um usuário criado
    Quando eu gerar um token de acesso para o usuário
    Então o token de acesso deve ser gerado com sucesso

  Cenário: Deve validar que o usuário está autorizado
    Dado que exista um usuário criado com token válido
    Quando eu verificar a autorização do usuário
    Então o usuário deve estar autorizado

  Cenário: Deve listar os livros disponíveis
    Quando eu listar os livros disponíveis
    Então a lista de livros deve ser retornada com sucesso

  Cenário: Deve alugar dois livros e validar no usuário
    Dado que exista um usuário criado com token válido
    E que existam livros disponíveis
    Quando eu alugar dois livros para o usuário
    Então o usuário deve possuir os dois livros alugados


