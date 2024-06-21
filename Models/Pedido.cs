namespace Forms.Models
{
    public class Pedido
    {
        public int Id { get; set; }
        public string NomeCliente { get; set; }
        public DateTime DataPedido { get; set; }
        public virtual ICollection<Item> Itens { get; set; }
    }
}
