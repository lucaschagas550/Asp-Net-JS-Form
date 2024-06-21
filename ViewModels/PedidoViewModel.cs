namespace Forms.ViewModels
{
    public class PedidoViewModel
    {
        public string NomeCliente { get; set; }
        public DateTime DataPedido { get; set; }
        public List<ItemViewModel> Itens { get; set; }
    }
}
