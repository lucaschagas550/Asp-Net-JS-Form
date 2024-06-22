using Forms.Models;

namespace Forms.ViewModels
{
    public class PedidoViewModel
    {
        public ClienteViewModel Cliente { get; set; } = new ClienteViewModel();
        public List<ItemViewModel> Itens { get; set; } = new List<ItemViewModel>();
        public List<LojasDisponiveisViewModel> Lojas { get; set; } = new List<LojasDisponiveisViewModel>();
        public ErroListaApi ErrosApi { get; set; } = new ErroListaApi();
    }
}
