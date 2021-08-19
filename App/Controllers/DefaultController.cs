using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
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
