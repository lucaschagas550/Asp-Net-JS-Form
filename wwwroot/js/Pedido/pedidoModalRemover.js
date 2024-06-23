var itemToRemove; // Variável global para armazenar a linha a ser removida

//REMOVER ITEM SEM USAR O DATATABLES
//function confirmDelete(button) {
//    itemToRemove = $(button).closest('tr'); // Armazena a linha a ser removida
//    $('#deleteConfirmacao').modal('show'); // Mostra o modal de confirmação
//}

////Remove o item da tabela
//function removeItem() {
//    if (itemToRemove) {
//        itemToRemove.remove(); // Remove a linha armazenada
//        updateIndices(); // Atualiza os índices
//        $('#deleteConfirmacao').modal('hide'); // Fecha o modal de confirmação
//        itemToRemove = null; // Limpa a variável
//    }
//}

//// Atualiza índices da tabela para que o envio do formulário aconteça de forma correta apos remover um item
//function updateIndices() {
//    $('#itens-table tr').each(function (index, row) {
//        $(row).find('input').each(function () {
//            var name = $(this).attr('name');
//            if (name) {
//                var newName = name.replace(/\[\d+\]/, '[' + index + ']');
//                $(this).attr('name', newName);
//            }
//        });
//    });
//}





//REMOVER COM DATATABLES
function confirmDelete(button) {
    var table = $('#tabelaItens').DataTable();
    itemToRemove = table.row($(button).closest('tr')); // Armazena a linha do DataTables a ser removida
    $('#deleteConfirmacao').modal('show'); // Mostra o modal de confirmação
}

function removeItem() {
    if (itemToRemove) {
        itemToRemove.remove().draw(false); // Remove a linha armazenada e redesenha a tabela
        updateIndices(); // Atualiza os índices
        $('#deleteConfirmacao').modal('hide'); // Fecha o modal de confirmação
        itemToRemove = null; // Limpa a variável
    }
}

function updateIndices() {
    var table = $('#tabelaItens').DataTable();
    table.rows().nodes().each(function (row, index) {
        $(row).find('input').each(function () {
            var name = $(this).attr('name');
            if (name) {
                var newName = name.replace(/\[\d+\]/, '[' + index + ']');
                $(this).attr('name', newName);
            }
        });
    });
}