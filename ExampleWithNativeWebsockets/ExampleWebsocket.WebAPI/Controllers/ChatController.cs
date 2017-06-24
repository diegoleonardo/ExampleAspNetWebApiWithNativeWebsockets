using System.Net.Http;
using System.Web.Http;
using Microsoft.Web.WebSockets;
using System.Web;

namespace ExampleWebsocket.WebAPI.Controllers
{
    class ChatWebsocketHandler : WebSocketHandler
    {
        private static WebSocketCollection _chatClients = new WebSocketCollection();
        private string _username;

        public ChatWebsocketHandler(string username)
        {
            _username = username;
        }

        public override void OnOpen()
        {
            _chatClients.Add(this);
        }

        public override void OnMessage(string message)
        {
            _chatClients.Broadcast($"{_username}: {message}");
        }

    }

    public class ChatController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Get(string username)
        {
            HttpContext.Current.AcceptWebSocketRequest(new ChatWebsocketHandler(username));
            return Request.CreateResponse(System.Net.HttpStatusCode.SwitchingProtocols);
        }
    }
}
