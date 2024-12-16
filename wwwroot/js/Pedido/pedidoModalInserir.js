$(document).ready(function () {

    //Remove o required do campo de data, permitindo que ele aceite nada, vulgo, null
    //$('#itemData').prop('required', false);

    //Btn de add novo item na tabela
    $('#saveItemButton').click(function () {
        var valorPaisSelecionado = $('#itemPais').val();
        var textoPaisSelecionado = $('#itemPais option:selected').text();
        var descricao = $('#itemDescricao').val();
        var quantidade = $('#itemQuantidade').val();
        var preco = $('#itemPreco').val();
        var data = $('#itemData').val();
        var desconto = $('#itemDesconto').is(':checked'); // Verifica se o checkbox está marcado

        var isValid = true;

        //Eh possivel realizar validacoes nos campos da modal quando clicado o botao de finalizar
        //MENSAGENS EH PORTUGUES SAO VAO FUNCIONAR SE TU SALVAR EM UTF-8 O ARQUIVO
        //FILE => SAVE pedidoModalInserir.js AS => NO BOTAO SAVE TEM UM SETA PARA BAIXO, "SAVE WITH ENCODING", ESCOLHER UTF-8
        //link de referencia => https://stackoverflow.com/questions/42158277/seperate-js-file-utf-8-not-working-in-asp-net-mvc-razor
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
            var table = $('#tabelaItens').DataTable();
            var index = table.rows().nodes().length; // Conta o número total de linhas visíveis na tabela (ou seja, as linhas que ainda estão presentes no DOM)
            console.log("index " + index);
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

            //Montagem da nova linha para a tabela SEM DATATABLES
            //var row = '<tr>' +
            //    '<td class="max-width-450">' +
            //        '<div class="descricao">' + descricao + '</div>' +
            //        '<input name="Itens[' + index + '].Descricao" class="readonly-input-center" value="' + descricao + '" hidden="hidden"/>' +
            //    '</td>' +
            //    '<td class="max-width-450">' +
            //        '<div class="quantidade">' + quantidade + '</div>' +
            //        '<input name="Itens[' + index + '].Quantidade" class="readonly-input-center" value="' + quantidade + '" hidden="hidden" />' +
            //    '</td>' +
            //        '<td class="max-width-450">' +
            //        '<div class="preco"> R$ ' + preco + '</div>' +
            //        '<input type="text" name="Itens[' + index + '].Preco" class="readonly-input" value="' + preco + '" hidden="hidden" />' +
            //    '</td>' +
            //        '<td class="max-width-450">' +
            //        '<div class="data" >' + displayData + '</div>' +
            //        '<input name="Itens[' + index + '].Data" type="date" class="readonly-input-center no-calendar" value="' + formattedData + '" hidden="hidden" />' +
            //    '</td>' +
            //    '<td class="max-width-450">' +
            //        '<i class="fs-5 desconto-icon ' + descontoIconClass + '"></i>' +
            //        '<input name="Itens[' + index + '].Desconto" type="checkbox" class="readonly-input checkbox-desconto" hidden="hidden" value="' + (desconto ? 'true' : 'false') + '" ' + (desconto ? 'checked' : '') + ' />' +
            //    '</td>' +
            //    '<td class="max-width-450">' +
            //        '<div>' +
            //            '<button type="button" class="btn btn-warning me-2 mb-2" onclick="editItem(this)">Editar</button>' +
            //            '<button type="button" class="btn btn-danger mb-2" onclick="removeItem(this)">Remover</button>' +
            //        '</div>' +
            //    '</td>' +
            //    '</tr>';

            //$('#itens-table').append(row); //SOMENTE

            console.log("index => " + index);
            // Montagem da nova linha para a tabela COM DATATABLES, tem que colocar todo conteudo do TD de uma unica linha
            var newRow = [
                '<input name="Itens[' + index + '].Descricao" class="readonly-input-center" value="' + descricao + '" hidden="hidden"/>',
                '<div class="quantidade">' + quantidade + '</div><input name="Itens[' + index + '].Quantidade" class="readonly-input-center" value="' + quantidade + '" hidden="hidden"/>',
                '<div class="preco"> R$ ' + preco + '</div><input type="text" name="Itens[' + index + '].Preco" class="readonly-input" value="' + preco + '" hidden="hidden"/>',
                '<div class="data">' + displayData + '</div><input name="Itens[' + index + '].Data" type="date" class="readonly-input-center no-calendar" value="' + formattedData + '" hidden="hidden"/>',
                '<i class="fs-5 desconto-icon ' + descontoIconClass + '"></i><input name="Itens[' + index + '].Desconto" type="checkbox" class="readonly-input checkbox-desconto" hidden="hidden" value="' + (desconto ? 'true' : 'false') + '" ' + (desconto ? 'checked' : '') + '/>',
                '<div class="pais">' + textoPaisSelecionado + '</div><input name="Itens[' + index + '].PaisId" class="readonly-input-center" value="' + valorPaisSelecionado + '" hidden="hidden"/>',
                '<div><button type="button" class="btn btn-warning me-2 mb-2" onclick="editItem(this)">Editar</button><button type="button" class="btn btn-danger mb-2" onclick="confirmDelete(this)">Remover</button></div>'
            ];

            console.log('ADD NOVA LINHA');
            // Adicionar a nova linha à tabela DataTables seguindo a ordem, ou seja, sera a ultima
            //var table = $('#tabelaItens').DataTable();
            //table.row.add(newRow).draw(false); // False redesenha a tabela garantindo que os valores aparecem


            //Sequencia para adicionar linha e deixar como 1 item da tabela
            table.row.add(newRow).draw(false); // Adiciona a linha no final
            // Pega os dados de todas as linhas da tabela
            var rows = table.rows().data().toArray();
            // Insere a nova linha no início do array de dados
            rows.unshift(rows.pop());

            // Redesenha a tabela com os dados atualizados
            table.clear().rows.add(rows).draw(false);

            table.order([1, 'asc']).draw();

            //Atualiza o index no input para o envio a controller
            table.rows().nodes().each(function (row, index) {
                $(row).find('input').each(function () {
                    var name = $(this).attr('name');
                    if (name) {
                        var newName = name.replace(/\[\d+\]/, '[' + index + ']');
                        $(this).attr('name', newName);
                    }
                });
            });

            // Fechar o modal
            $('#closeModalButton').click();
        }
    });
});