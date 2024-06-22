using System.ComponentModel;

namespace Forms.ViewModels
{
    public class PedidoViewModel
    {
        [DisplayName("Nome do Cliente")]
        public string NomeCliente { get; set; }

        [DisplayName("Data Pedido")]
        public DateTime DataPedido { get; set; }
        public List<ItemViewModel> Itens { get; set; }
    }
}
