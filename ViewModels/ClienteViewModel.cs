using System.ComponentModel;

namespace Forms.ViewModels
{
    public class ClienteViewModel
    {
        [DisplayName("Nome do Cliente")]
        public string NomeCliente { get; set; }

        [DisplayName("Data Pedido")]
        public DateTime DataPedido { get; set; }
    }
}
