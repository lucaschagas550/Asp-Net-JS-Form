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



//function updateIndices() {
//    var table = $('#tabelaItens').DataTable();
//    //var rows = table.rows().nodes(); // Pega todas as linhas da tabela como nodes

//    var rows = table.rows().data().toArray();
//    // Insere a nova linha no início do array de dados
//    rows.unshift(rows.pop());
//    // Redesenha a tabela com os dados atualizados
//    table.clear().rows.add(rows).draw(false);

//    // Itera sobre cada linha e atualiza o índice
//    //$(rows).each(function (index) {
//        // Supondo que o índice esteja na primeira coluna
//        //$(this).find('td').eq(0);
//    //});

//    // Redesenha a tabela
//    //table.draw(false);
//}

//PODE SER QUE AO REMOVER E INSERIR EM SEQUENCIA O INDICE SE PERCA, RECOMENDA UTILIZAR METODO ACIMA.
//ISTO ACONTECE DE PERDE O INDICE, SE AO INSERIR VOCE QUER QUE O ITEM NOVO SEJA O PRIMEIRO ITEM DA TABELA E ASSIM POR DIANTE
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