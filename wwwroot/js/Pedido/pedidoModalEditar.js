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

        //Para CheckBox
        var desconto = $('#editItemDesconto').is(':checked');

        //Para SelectList
        var valorPaisSelecionado = $('#editItemPais').val();
        var textoPaisSelecionado = $('#editItemPais option:selected').text();

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
            var table = $('#tabelaItens').DataTable();

            if (data) {
                displayData = formatDateToDDMMYYYY(data);
            }

            var descontoIconClass = desconto ? 'bi bi-check-circle' : 'bi bi-x-circle';

            var updatedRow = [
                '<div class="descricao">' + descricao + '</div><input name="Itens[' + editingRowIndex + '].Descricao" class="readonly-input-center" value="' + descricao + '" hidden="hidden"/>',
                '<div class="quantidade">' + quantidade + '</div><input name="Itens[' + editingRowIndex + '].Quantidade" class="readonly-input-center" value="' + quantidade + '" hidden="hidden"/>',
                '<div class="preco"> R$ ' + preco + '</div><input type="text" name="Itens[' + editingRowIndex + '].Preco" class="readonly-input" value="' + preco + '" hidden="hidden"/>',
                '<div class="data">' + displayData + '</div><input name="Itens[' + editingRowIndex + '].Data" type="date" class="readonly-input-center no-calendar" value="' + data + '" hidden="hidden"/>',
                '<i class="fs-5 desconto-icon ' + descontoIconClass + '"></i><input name="Itens[' + editingRowIndex + '].Desconto" type="checkbox" class="readonly-input checkbox-desconto" hidden="hidden" value="' + (desconto ? 'true' : 'false') + '" ' + (desconto ? 'checked' : '') + '/>',
                '<div class="pais">' + textoPaisSelecionado + '</div><input name="Itens[' + editingRowIndex + '].PaisId" class="readonly-input-center" value="' + valorPaisSelecionado + '" hidden="hidden"/>',
                '<div><button type="button" class="btn btn-warning me-2 mb-2" onclick="editItem(this)">Editar</button><button type="button" class="btn btn-danger mb-2" onclick="confirmDelete(this)">Remover</button></div>'
            ];

            //ATUALIZA A LINHA DA TABELA
            table.row(editingRowIndex).data(updatedRow).invalidate().draw(false);

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

    //Atualizar o item mesmo com paginacao na tabela
    var table = $('#itens-table').closest('table').DataTable();
    var tableIndex = table.row(row).index();
    editingRowIndex = tableIndex;

    //Pega o item da linha que tem o name terminando com .* (Alguma coisa exemplo .Data, .Preco, .Quantidade, .Desconto)
    $('#editItemDescricao').val(row.find('input[name$=".Descricao"]').val());
    $('#editItemQuantidade').val(row.find('input[name$=".Quantidade"]').val());

    // Formatação do preço para o padrão brasileiro para exibir na tabela
    var preco = row.find('input[name$=".Preco"]').val();
    var precoNumerico = parseFloat(preco.replace(/\./g, '').replace(',', '.'));
    var precoFormatado = precoNumerico.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    $('#editItemPreco').val(precoFormatado);
    $('#editItemData').val(row.find('input[name$=".Data"]').val());
    $('#editItemPais').val(row.find('input[name$=".PaisId"]').val());

    var checkbox = row.find('input[name$=".Desconto"]');
    if (checkbox.length > 0) {
        var isChecked = checkbox.is(':checked'); //Verifica se ele este checkado, true ou false
        console.log(isChecked);

        $('#editItemDesconto').prop('checked', isChecked); //Checkbox precisar alterar o valor da propriedade e nao setar o valor diretamente pelo Id do campo
    }

    $('#editItemModal').modal('show');
}