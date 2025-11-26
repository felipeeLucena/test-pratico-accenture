# language: pt
@ui
Funcionalidade: Alerts, Frame & Windows - Browser Windows

  Cenário: Alerts, Frame & Windows - Cenário 2 - Deve abrir nova janela com a mensagem de exemplo
    Dado que eu acesse a página Browser Windows
    Quando eu clicar no botão New Window
    Então a nova janela deve exibir a mensagem This is a sample page
    E eu devo retornar para a página Browser Windows


