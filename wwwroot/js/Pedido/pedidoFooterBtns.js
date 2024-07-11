function submitForm() {
    limparSearchDaTabela();
}

function limparSearchDaTabela() {
    console.log("Limpar");
    var table = $("#tabelaItens").DataTable(); // Obtém a instância do DataTables
    table.search("").draw(); // Limpa o campo de pesquisa e redesenha a tabela

    //Chama Modal para mostrar o loading de carregamento enquanto processa os dados
    $('#spinner').modal('show');

    return true; // Permite que o formulário seja submetido
}
