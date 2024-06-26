var editingRowIndex;

$(document).ready(function () {

    //Esconde primeira modal de edicao, e chama a de confirmacao, se caso tiver validacoes elas devem acontecer aqui neste metodo, nao no abaixo, porque a modal de mensagem sera chamada sem validar
    $('#confirmUpdateButton').click(function () {
        $('#editItemModal').modal('hide');
        $('#editConfirmacao').modal('show');
    });

    //Btn atualizar da Modal
    $('#updateItemButton').click(function () {

        var descricao = $('#editItemDescricao').val();
        var quantidade = $('#editItemQuantidade').val();
        var preco = $('#editItemPreco').val();
        var data = $('#editItemData').val();
        var desconto = $('#editItemDesconto').is(':checked');
        var displayData = '';

        var isValid = true;

        //Eh possivel realizar validacoes nos campos da modal quando clicado o botao de finalizar
        //MENSAGENS EH PORTUGUES SAO VAO FUNCIONAR SE TU SALVAR EM UTF-8 O ARQUIVO
        //FILE => SAVE pedidoModalEditar.js AS => NO BOTAO SAVE TEM UM SETA PARA BAIXO, "SAVE WITH ENCODING", ESCOLHER UTF-8
        //link de referencia => https://stackoverflow.com/questions/42158277/seperate-js-file-utf-8-not-working-in-asp-net-mvc-razor
        if (!descricao) {
            $('#editItemDescricaoError').text('Campo obrigatório.').show();
            isValid = false;
        } else {
            $('#editItemDescricaoError').hide();
        }

        if (!quantidade) {
            $('#editItemQuantidadeError').text('Campo obrigatório.').show();
            isValid = false;
        } else {
            $('#editItemQuantidadeError').hide();
        }

        if (!preco) {
            $('#editItemPrecoError').text('Campo obrigatório.').show();
            isValid = false;
        } else {
            $('#editItemPrecoError').hide();
        }

        if (isValid) {
            var row = $('#itens-table tr').eq(editingRowIndex);

            //Valida se tem valor na data se nao tiver apenas nao mostra nada
            if (data) {
                // Formatação da data no formato dd/MM/yyyy
                displayData = formatDateToDDMMYYYY(data);
            }

            //Atualiza os valores para os campos inputs que serao enviados para a controller
            row.find('input[name$=".Descricao"]').val(descricao);
            row.find('input[name$=".Quantidade"]').val(quantidade);
            row.find('input[name$=".Preco"]').val(preco);
            row.find('input[name$=".Data"]').val(data);
            var checkbox = row.find('input[name$=".Desconto"]');

            if (checkbox.length > 0) {
                checkbox.prop('checked', desconto);
                checkbox.val(desconto ? 'true' : 'false'); // Atualiza o valor do checkbox baseado no estado

                var icon = row.find('.desconto-icon');
                if (desconto) {
                    icon.removeClass('bi-x-circle').addClass('bi-check-circle');
                } else {
                    icon.removeClass('bi-check-circle').addClass('bi-x-circle');
                }
            }

            // Atualiza os valores nas divs visíveis na tabela
            row.find('div.descricao').text(descricao);
            row.find('div.quantidade').text(quantidade);
            row.find('div.preco').text('R$ ' + preco);
            row.find('div.data').text(displayData);

            // Fechar o modal e remover o fundo ofuscado da edicao
            // $('#editItemModal').modal('hide').on('hidden.bs.modal', function () {
            //     $('body').removeClass('modal-open');
            //     $('.modal-backdrop').remove();
            // });


            // Obter a instância do DataTables
            var table = $('#tabelaItens').DataTable();

            // Atualiza a tabela DataTables
            table.row(editingRowIndex).invalidate().draw(); //SOMENTE SE TIVER DATATABLES

            // Fechar o modal e remover o fundo ofuscado da confirmacao da edicao
            $('#editConfirmacao').modal('hide').on('hidden.bs.modal', function () {
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            });
        }
    });
});



//Btn de Editar, chamado ao clicar no botao da tabela para editar
function editItem(button) {
    var row = $(button).closest('tr');
    editingRowIndex = row.index();

    console.log(valorDaViewModel);

    //Pega o item da linha que tem o name terminando com .* (Alguma coisa exemplo .Data, .Preco, .Quantidade, .Desconto)
    $('#editItemDescricao').val(row.find('input[name$=".Descricao"]').val());
    $('#editItemQuantidade').val(row.find('input[name$=".Quantidade"]').val());

    // Formatação do preço para o padrão brasileiro para exibir na tabela
    var preco = row.find('input[name$=".Preco"]').val();
    var precoNumerico = parseFloat(preco.replace(/\./g, '').replace(',', '.'));
    var precoFormatado = precoNumerico.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    $('#editItemPreco').val(precoFormatado);
    $('#editItemData').val(row.find('input[name$=".Data"]').val());

    var checkbox = row.find('input[name$=".Desconto"]');
    if (checkbox.length > 0) {
        var isChecked = checkbox.is(':checked'); //Verifica se ele este checkado, true ou false
        console.log(isChecked);

        $('#editItemDesconto').prop('checked', isChecked); //Checkbox precisar alterar o valor da propriedade e nao setar o valor diretamente pelo Id do campo
    }

    $('#editItemModal').modal('show');
}