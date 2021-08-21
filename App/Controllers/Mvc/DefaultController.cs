using Microsoft.AspNetCore.Mvc;

namespace Insurance.Calculator.App.Controllers.Mvc
{
    public class DefaultController : Controller
    {
        public DefaultController()
        {
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
