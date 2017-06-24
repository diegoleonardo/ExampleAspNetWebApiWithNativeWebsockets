using System.Web.Mvc;

namespace ExampleWebsocket.WebAPI.Controllers
{
    public class ChatHomeController : Controller
    {
        // GET: ChatHome
        public ActionResult Index()
        {
            return View();
        }
    }
}