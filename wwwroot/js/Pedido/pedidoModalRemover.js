var itemToRemove; // Variável global para armazenar a linha a ser removida

function confirmDelete(button) {
    itemToRemove = $(button).closest('tr'); // Armazena a linha a ser removida
    $('#deleteConfirmacao').modal('show'); // Mostra o modal de confirmação
}

//Remove o item da tabela
function removeItem() {
    if (itemToRemove) {
        itemToRemove.remove(); // Remove a linha armazenada
        updateIndices(); // Atualiza os índices
        $('#deleteConfirmacao').modal('hide'); // Fecha o modal de confirmação
        itemToRemove = null; // Limpa a variável
    }
}

// Atualiza índices da tabela para que o envio do formulário aconteça de forma correta apos remover um item
function updateIndices() {
    $('#itens-table tr').each(function (index, row) {
        $(row).find('input').each(function () {
            var name = $(this).attr('name');
            if (name) {
                var newName = name.replace(/\[\d+\]/, '[' + index + ']');
                $(this).attr('name', newName);
            }
        });
    });
}