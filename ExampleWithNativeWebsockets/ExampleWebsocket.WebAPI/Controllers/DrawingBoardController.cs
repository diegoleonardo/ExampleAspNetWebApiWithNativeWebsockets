using Microsoft.Web.WebSockets;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebGrease.Css.Extensions;

namespace ExampleWebsocket.WebAPI.Controllers
{
    class DrawingBoardSocketHandler : WebSocketHandler
    {
        private static WebSocketCollection _chatClients = new WebSocketCollection();

        public override void OnOpen()
        {
            _chatClients.Add(this);
        }

        public override void OnMessage(string message)
        {
            //_chatClients.ForEach(x => x.Send(message));
            _chatClients.Broadcast(message);
        }

    }

    public class DrawingBoardController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Get()
        {
            HttpContext.Current.AcceptWebSocketRequest(new DrawingBoardSocketHandler());
            return Request.CreateResponse(System.Net.HttpStatusCode.SwitchingProtocols);
        }
    }
}
