using Microsoft.AspNetCore.Mvc;

namespace Forms.Controllers.Base
{
    public class MainController : Controller
    {
        protected void AdicionarErroValidacao(string mensagem) =>
            ModelState.AddModelError(string.Empty, mensagem);

        protected bool OperacaoValida()
        {
            return ModelState.ErrorCount == 0;
        }
    }
}
