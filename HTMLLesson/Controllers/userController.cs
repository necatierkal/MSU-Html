using HTMLLesson.Context;
using HTMLLesson.Models;
using Microsoft.AspNetCore.Mvc;

namespace HTMLLesson.Controllers
{
    public class userController : Controller
    {
        private readonly MSUDBContext _context;
        public userController(MSUDBContext context)
        {
                _context = context;
        }

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
            _context.Users.Add(user);
            _context.SaveChanges();
           // user.Name = string.Concat("Değişen-", user.Name);
            return user;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View(); 
        }

    }
}

/*Controller backend view frontend model entityleri içinde barındırır.*/
