$(document).ready(function () {
    // Desabilita a digitação nos campos de data, permitindo apenas a seleção via calendário, assim evitando que o usuario coloque no ano 6 digitos, isto quebra a tabela
    $('.date-field').on('keypress keydown keyup', function (e) {
        e.preventDefault();
    });
});

function formatDateToDDMMYYYY(dateString) {
    var dateParts = dateString.split("-");
    var year = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; // Meses começam em 0
    var day = parseInt(dateParts[2], 10);

    var dateObj = new Date(year, month, day);

    return ('0' + dateObj.getDate()).slice(-2) + '/' +
        ('0' + (dateObj.getMonth() + 1)).slice(-2) + '/' +
        dateObj.getFullYear();
}