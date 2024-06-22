using Microsoft.AspNetCore.Mvc;

namespace Forms.Components
{
    public class ErrorSummaryViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
