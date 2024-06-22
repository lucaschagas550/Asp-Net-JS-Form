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
                Cliente = new ClienteViewModel
                {
                    NomeCliente = "Cliente A",
                    DataPedido = DateTime.Now,
                },
                Itens = new List<ItemViewModel>
                {
                    new ItemViewModel
                    {
                        Descricao = "Item 1 Item 1 Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 555555 1Item 5555551Item 5555551Item 5555551Item 5555551Item 5555551Item 5555551Item 5555551Item 5555551Item 5555551Item 5555551Item 5555551Item 5555551Item 5555551Item 555555 5555551Item 5555551Item 5555551Item 5555551Item 5555555555551Item 5555551Item 5555551Item 5555551Item 5555555555551Item 5555551Item 5555551Item 5555551Item 5555555555551Item 5555551Item 5555551Item 5555551Item 5555555555551Item 5555551Item 5555551Item 5555551Item 5555555555551Item 5555551Item 5555551Item 5555551Item 5555555555551Item 5555551Item 5555551Item 5555551Item 5555555555551Item 5555551Item 5555551Item 5555551Item 5555555555551Item 5555551Item 5555551Item 5555551Item 5555555555551Item 5555551Item 5555551Item 5555551Item 555555",
                        Quantidade = 2,
                        Preco = 10.0m,
                        Data = DateTime.Now,
                        Desconto= false,
                    },
                    new ItemViewModel
                    {
                        Descricao = "Item 2",
                        Quantidade = 1,
                        Preco = 20.05m,
                        Data = DateTime.Now.AddDays(25),
                        Desconto= true,
                    },
                                       new ItemViewModel
                    {
                        Descricao = "Item 3",
                        Quantidade = 5,
                        Preco = 65.65m,
                        Data = DateTime.Now.AddDays(2),
                        Desconto = false,
                    }
                },
                Lojas = new List<LojasDisponiveisViewModel>
                {
                    new LojasDisponiveisViewModel("Loja 1","00000-000", 999),
                    new LojasDisponiveisViewModel("Loja 2","00000-001", 888),
                    new LojasDisponiveisViewModel("Loja 3","00000-002", 777),
                }
            };
        }
    }
}
