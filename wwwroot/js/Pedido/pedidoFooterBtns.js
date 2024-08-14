function submitForm() {
    limparSearchDaTabela();
    removerPaginacao();
}

function limparSearchDaTabela() {
    console.log("Limpar");
    var table = $("#tabelaItens").DataTable(); // Obtém a instância do DataTables
    table.search("").draw(); // Limpa o campo de pesquisa e redesenha a tabela

    //Chama Modal para mostrar o loading de carregamento enquanto processa os dados
    $('#spinner').modal('show');

    return true; // Permite que o formulário seja submetido
}

//Remove a paginacao para que todos os dados sejam enviados
function removerPaginacao() {
    var table = $('#tabelaItens').DataTable();

    // Desabilita a paginação
    table.page.len(-1).draw();

    // Atualiza o index no input para o envio ao controller
    table.rows().nodes().each(function (row, index) {
        $(row).find('input').each(function () {
            var name = $(this).attr('name');
            if (name) {
                var newName = name.replace(/\[\d+\]/, '[' + index + ']');
                $(this).attr('name', newName);
            }
        });
    });

    return true; // Prosseguir com o envio do formulário
};