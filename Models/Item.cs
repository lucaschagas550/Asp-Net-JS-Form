namespace Forms.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public int Quantidade { get; set; }
        public decimal Preco { get; set; }
        public int PedidoId { get; set; }
        public int PaisId { get; set; }
        public virtual Pedido Pedido { get; set; }
    }
}
