$(document).ready(function () {
  // Desabilita a digitação nos campos de data, permitindo apenas a seleção via calendário, assim evitando que o usuario coloque no ano 6 digitos, isto quebra a tabela
  $(".date-field").on("keypress keydown keyup", function (e) {
    e.preventDefault();
  });

  //var table = $('#tabelaItens').DataTable({
  //     "info": false, // Desativa a exibição do texto "Showing 1 to X of Y entries"
  //    "scrollX": true, // Desativa o scroll horizontal
  //    "autoWidth": true, // Habilita ajuste automático de largura das colunas
  //    "language": {
  //        "search": "Pesquisar:", // Altera o texto do campo de busca
  //        "lengthMenu": "_MENU_ Registros por página",
  //        "zeroRecords": "Nenhum registro encontrado",
  //        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
  //        "infoEmpty": "Mostrando 0 a 0 de 0 registros",
  //        "infoFiltered": "(filtrado de _MAX_ registros no total)",
  //    }
  //});

  var table = $("#tabelaItens").DataTable({
    //"scrollX": true, // Habilita o scroll horizontal
    language: {
      search: "Pesquisar:", // Altera o texto do campo de busca
      lengthMenu: "Registros por página _MENU_",
      zeroRecords: "Nenhum registro encontrado",
      info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      infoEmpty: "Mostrando 0 a 0 de 0 registros",
      infoFiltered: "(filtrado de _MAX_ registros no total)",
      emptyTable: "Nenhum dado disponível na tabela", // Mensagem personalizada para tabela vazia
      paginate: {
        first: "Primeiro",
        last: "Último",
        next: "Próximo",
        previous: "Anterior",
      },
    },
    autoWidth: false, // Desativa o ajuste automático de largura das colunas
    order: [], // Desativa a ordenação inicial, assim todo item adiciona vai para o fim da tabela
    columnDefs: [
      { orderable: false, targets: -1 }, // Desativa a ordenação na última coluna
      { orderable: false, targets: 4 }, // Desativa a ordenação na coluna numero 4 (contagem inicia do 0)
      { searchable: false, targets: [2] }, // Desativa a busca em outras colunas específicas, lembrando que inicia-se a contagem da primeira coluna no indice 0
      //No DataTables, as colunas são identificadas por um índice baseado em zero (zero-based index).
      //Isso significa que a primeira coluna tem o índice 0, a segunda coluna tem o índice 1,
      //e assim por diante.O índice - 1 refere - se à última coluna da tabela, -2 à penúltima, e assim por diante.
    ],
  });
});

//Formatacao de data para exibicao na tabela
function formatDateToDDMMYYYY(dateString) {
  var dateParts = dateString.split("-");
  var year = parseInt(dateParts[0], 10);
  var month = parseInt(dateParts[1], 10) - 1; // Meses começam em 0
  var day = parseInt(dateParts[2], 10);

  var dateObj = new Date(year, month, day);

  return (
    ("0" + dateObj.getDate()).slice(-2) +
    "/" +
    ("0" + (dateObj.getMonth() + 1)).slice(-2) +
    "/" +
    dateObj.getFullYear()
  );
}

//Limpa o search do DATATABLES antes do envio, para que todos os registros sejam enviados
function clearSearchAndSubmit() {
  var table = $("#tabelaItens").DataTable(); // Obtém a instância do DataTables
  table.search("").draw(); // Limpa o campo de pesquisa e redesenha a tabela

  return true; // Permite que o formulário seja submetido
}
