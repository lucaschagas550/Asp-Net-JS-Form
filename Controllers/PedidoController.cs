using Forms.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Forms.Controllers
{
    public class PedidoController : Controller
    {
        public PedidoController()
        {

        }


        public IActionResult Create()
        {
            var pedidos = CriarPedidos();
            return View(pedidos);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(PedidoViewModel viewModel)
        {
            return View(viewModel);
        }

        private static PedidoViewModel CriarPedidos()
        {
            return new PedidoViewModel()
            {
                NomeCliente = "Cliente A",
                DataPedido = DateTime.Now,
                Itens = new List<ItemViewModel>
                {
                    new ItemViewModel
                    {
                        Descricao = "Item 1",
                        Quantidade = 2,
                        Preco = 10.0m
                    },
                    new ItemViewModel
                    {
                        Descricao = "Item 2",
                        Quantidade = 1,
                        Preco = 20.0m
                    }
                }
            };
        }
    }
}
