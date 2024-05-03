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
        public long Register([FromBody]User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
           // user.Name = string.Concat("Değişen-", user.Name);
            return user.Id;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View(); 
        }

        [HttpPost]
        public bool Login([FromBody]UserLogin userLogin)
        {
            User? user = _context.Users.FirstOrDefault(x => x.Username == userLogin.Username && x.Password == userLogin.Password);
            return user == null ? false :true;
        }

    }
}

/*Controller backend view frontend model entityleri içinde barındırır.*/
