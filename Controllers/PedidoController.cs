using Forms.Models;
using Forms.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Forms.Controllers
{
    public class PedidoController : Controller
    {
        public PedidoController()
        {

        }

        [HttpGet("create")]
        public IActionResult Create()
        {
            var pedidos = CriarPedidos();
            CriarViewBag(pedidos);
            return View(pedidos);
        }


        [HttpPost("create")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(PedidoViewModel viewModel)
        {
            try
            {
                await Task.Delay(5000).ConfigureAwait(false);

                viewModel.ErrosApi.Erros.Add("deu erro 1");
                viewModel.ErrosApi.Erros.Add("deu erro 2");
                viewModel.ErrosApi.Erros.Add("deu erro 3");
                viewModel.ErrosApi.Erros.Add("deu erro 4");
                viewModel.ErrosApi.Erros.Add("deu erro 5");

                TempData["ListaErrosApi"] = viewModel.ErrosApi.Erros;
               
                CriarViewBag(viewModel);

                return View(viewModel);
            }
            catch (Exception ex)
            {
                return View(viewModel);
            }
        }

        [HttpPost("update")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(PedidoViewModel viewModel)
        {
            try
            {
                await Task.Delay(5000).ConfigureAwait(false);

                viewModel.ErrosApi.Erros.Add("deu erro 1");
                viewModel.ErrosApi.Erros.Add("deu erro 2");
                viewModel.ErrosApi.Erros.Add("deu erro 3");
                viewModel.ErrosApi.Erros.Add("deu erro 4");
                viewModel.ErrosApi.Erros.Add("deu erro 5");

                TempData["ListaErrosApi"] = viewModel.ErrosApi.Erros;

                CriarViewBag(viewModel);

                return RedirectToAction(nameof(Create), viewModel);
            }
            catch (Exception ex)
            {
                return RedirectToAction(nameof(Create), viewModel);
            }
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
                        PaisId = 1,
                    },
                    new ItemViewModel
                    {
                        Descricao = "Item 2",
                        Quantidade = 1,
                        Preco = 20.05m,
                        Data = DateTime.Now.AddDays(25),
                        Desconto= true,
                        PaisId = 2,
                    },
                                       new ItemViewModel
                    {
                        Descricao = "Item 3",
                        Quantidade = 5,
                        Preco = 65.65m,
                        Data = DateTime.Now.AddDays(2),
                        Desconto = false,
                        PaisId = 3,
                    },
                },
                Lojas = new List<LojasDisponiveisViewModel>
                {
                    new LojasDisponiveisViewModel("Loja 1","00000-000", 999),
                    new LojasDisponiveisViewModel("Loja 2","00000-001", 888),
                    new LojasDisponiveisViewModel("Loja 3","00000-002", 777),
                }
            };
        }

        public void CriarViewBag(PedidoViewModel pedidoViewModel)
        {
            var paises = new List<PaisViewModel>() {
                new PaisViewModel(1,"Brasil"),
                new PaisViewModel(2,"Argentina"),
                new PaisViewModel(3,"Chile"),
                new PaisViewModel(4,"Paragui"),
                new PaisViewModel(5,"Uruguai")
            };

            ViewBag.Paises = new SelectList(paises,"Id","Nome");

            foreach(var item in pedidoViewModel.Itens)
            {
                item.ItemValueSelectList = new SelectList(paises, "Id", "Nome", item.PaisId);
                item.ItemTextSelectList = new SelectList(paises, "Id", "Nome", paises.FirstOrDefault(p => p.Id == item.PaisId)?.Nome);
            }
        }
    }
}
