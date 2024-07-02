//Alterar a action do form conforme o botao que eh ativo
document.getElementById('btnSaveCreate').addEventListener('click', function () {
    console.log('salvar');
    submitForm('/Pedido/Create');
});

document.getElementById('btnSaveUpdate').addEventListener('click', function () {
    console.log('update');
    submitForm('/Pedido/update');
});

document.getElementById('btnSaveDelete').addEventListener('click', function () {
    submitForm('/Pedido/Delete');
});

function limparSearchDaTabela() {
    console.log("Limpar");
    var table = $("#tabelaItens").DataTable(); // Obtém a instância do DataTables
    table.search("").draw(); // Limpa o campo de pesquisa e redesenha a tabela

    //Chama Modal para mostrar o loading de carregamento enquanto processa os dados
    $('#spinner').modal('show');

    return true; // Permite que o formulário seja submetido
}

function submitForm(actionUrl) {
    limparSearchDaTabela();
    document.getElementById('mainForm').action = actionUrl;
    document.getElementById('mainForm').submit();
}