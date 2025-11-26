# language: pt
@ui
Funcionalidade: Widgets - Progress Bar

  Cenário: Widgets - Cenário 5 - Deve parar progress bar antes de 25% e resetar ao completar
    Dado que eu acesse a página Progress Bar
    Quando eu clicar no botão Start
    E eu parar a progress bar antes de 25%
    Então o valor da progress bar deve ser menor ou igual a 25%
    Quando eu clicar no botão Start novamente
    E a progress bar chegar a 100%
    Então a progress bar deve ser resetada

