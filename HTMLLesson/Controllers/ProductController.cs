using HTMLLesson.Context;
using HTMLLesson.Models;
using Microsoft.AspNetCore.Mvc;

namespace HTMLLesson.Controllers
{
    public class ProductController : Controller
    {
       
        public ProductController()
        {
            
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

      
    }
}

/*Controller backend view frontend model entityleri içinde barındırır.*/
