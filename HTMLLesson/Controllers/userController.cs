using HTMLLesson.Models;
using Microsoft.AspNetCore.Mvc;

namespace HTMLLesson.Controllers
{
    public class userController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public User Register([FromBody]User user)
        {
            user.Name = string.Concat("Değişen-", user.Name);
            return user;
        }
    }
}

/*Controller backend view frontend model entityleri içinde barındırır.*/
