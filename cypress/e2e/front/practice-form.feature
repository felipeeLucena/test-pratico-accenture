# language: pt
@ui
Funcionalidade: Forms - Practice Form

  Cenário: Forms - Cenário 1 - Deve preencher e submeter o formulário de estudante com sucesso
    Dado que eu acesse a página Practice Form
    Quando eu preencher o formulário de estudante com dados válidos
    E eu submeter o formulário de estudante
    Então o resumo do formulário deve ser exibido em um popup
    E o popup deve ser fechado com sucesso


