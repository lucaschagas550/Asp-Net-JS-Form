$(document).ready(function () {
    $('.date').mask('00/00/0000')
    $('#number').mask('000')
    $('.money').mask('000.000.000.000.000,00', { reverse: true });
    $('#time').mask('00:00');


    // Adicionando máscara para dinheiro com sinal negativo opcional e limite de 18,2 decimais

    $('.money-negative').maskMoney({
        prefix: '',
        allowNegative: true,
        thousands: '.',
        decimal: ',',
        affixesStay: false,
        precision: 2 // Define a precisão para 2 casas decimais
    });

    // Limita o campo de entrada a 26 caracteres: 18 dígitos, 2 casas decimais e 1 sinal negativo
    $('.money-negative').attr('maxlength', 26);
});