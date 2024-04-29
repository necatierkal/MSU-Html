using Microsoft.AspNetCore.Mvc;

namespace HTMLLesson.Controllers
{
    public class userController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        public IActionResult Register()
        {
            return View();
        }
    }
}
