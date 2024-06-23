$(document).ready(function () {

    //Remove o required do campo de data, permitindo que ele aceite nada, vulgo, null
    //$('#itemData').prop('required', false);

    //Btn de add novo item na tabela
    $('#saveItemButton').click(function () {
        var descricao = $('#itemDescricao').val();
        var quantidade = $('#itemQuantidade').val();
        var preco = $('#itemPreco').val();
        var data = $('#itemData').val();
        var desconto = $('#itemDesconto').is(':checked'); // Verifica se o checkbox está marcado

        var isValid = true;

        if (!descricao) {
            $('#itemDescricaoError').text('Campo obrigatório.').show();
            isValid = false;
        } else {
            $('#itemDescricaoError').hide();
        }

        if (!quantidade) {
            $('#itemQuantidadeError').text('Campo obrigatório.').show();
            isValid = false;
        } else {
            $('#itemQuantidadeError').hide();
        }

        if (!preco) {
            $('#itemPrecoError').text('Campo obrigatório.').show();
            isValid = false;
        } else {
            $('#itemPrecoError').hide();
        }

        if (isValid) {
            var index = $('#itens-table tr').length;
            var formattedData = null;
            var displayData = '';

            //Valida se tem valor na data se nao tiver apenas nao mostra nada
            if (data) {
                formattedData = new Date(data).toISOString().split('T')[0];

                // Formatação da data no formato dd/MM/yyyy
                displayData = formatDateToDDMMYYYY(data);
            }

            //Definindo Icone para o checkbox se vai ser True check-circle ou false x-circle)
            var descontoIconClass = desconto ? 'bi bi-check-circle' : 'bi bi-x-circle';

            //Montagem da nova linha para a tabela
            var row = '<tr>' +
                '<td class="max-width-450">' +
                    '<div class="descricao">' + descricao + '</div>' +
                    '<input name="Itens[' + index + '].Descricao" class="readonly-input-center" value="' + descricao + '" hidden="hidden"/>' +
                '</td>' +
                '<td class="max-width-450">' +
                    '<div class="quantidade">' + quantidade + '</div>' +
                    '<input name="Itens[' + index + '].Quantidade" class="readonly-input-center" value="' + quantidade + '" hidden="hidden" />' +
                '</td>' +
                    '<td class="max-width-450">' +
                    '<div class="preco"> R$ ' + preco + '</div>' +
                    '<input type="text" name="Itens[' + index + '].Preco" class="readonly-input" value="' + preco + '" hidden="hidden" />' +
                '</td>' +
                    '<td class="max-width-450">' +
                    '<div class="data" >' + displayData + '</div>' +
                    '<input name="Itens[' + index + '].Data" type="date" class="readonly-input-center no-calendar" value="' + formattedData + '" hidden="hidden" />' +
                '</td>' +
                '<td class="max-width-450">' +
                    '<i class="fs-5 desconto-icon ' + descontoIconClass + '"></i>' +
                    '<input name="Itens[' + index + '].Desconto" type="checkbox" class="readonly-input checkbox-desconto" hidden="hidden" value="' + (desconto ? 'true' : 'false') + '" ' + (desconto ? 'checked' : '') + ' />' +
                '</td>' +
                '<td class="max-width-450">' +
                    '<div>' +
                        '<button type="button" class="btn btn-warning me-2 mb-2" onclick="editItem(this)">Editar</button>' +
                        '<button type="button" class="btn btn-danger mb-2" onclick="removeItem(this)">Remover</button>' +
                    '</div>' +
                '</td>' +
                '</tr>';

            $('#itens-table').append(row);

            // Fechar o modal
            $('#closeModalButton').click();
        }
    });
});