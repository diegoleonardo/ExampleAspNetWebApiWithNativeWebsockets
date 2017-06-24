using System.Web.Mvc;

namespace ExampleWebsocket.WebAPI.Controllers
{
    public class DrawingBoardHomeController : Controller
    {
        // GET: DrawingBoardHome
        public ActionResult Index()
        {
            return View();
        }
    }
}