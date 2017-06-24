$(function () {
    ///////////////////////////////////////////////////////////////
    // Standard drawing board functionalities
    ///////////////////////////////////////////////////////////////
    var colors = ["black", "red", "green", "blue", "yellow", "magenta", "white"];
    var canvas = $("#canvas");
    var colorElement = $("#color");
    for (var i = 0; i < colors.length; i++) {
        colorElement.append(
            "<option value='" + (i + 1) + "'>" + colors[i] + "</li>"
        );
    }
    var buttonPressed = false;
    canvas
        .mousedown(function () {
            buttonPressed = true;
        })
        .mouseup(function () {
            buttonPressed = false;
        }).mousemove(function (e) {
            if (buttonPressed) {
                setPoint(e.offsetX, e.offsetY, color);
            }
        });
    var ctx = canvas[0].getContext("2d");
    function setPoint(x, y, color) {
        ctx.fillStyle = colors[color - 1];
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    function clearPoints() {
        ctx.clearRect(0, 0, canvas.width(), canvas.height());
    }
    $("#clear").click(function () {
        clearPoints();
    });

    var color = colorElement.val(); // Accessible from server
    var uri = window.location.hostname + ":18732" + window.location.pathname.replace('/DrawingBoardHome', '/api/DrawingBoard');

    $("#color").on("change", function () {
        color = $(this).val();
    });

    ws = new WebSocket("ws://" + uri);

    ws.onopen = function () {
        connected = true;
    };

    ws.onmessage = function (event) {
        var dataJson = $.parseJSON(event.data);
        setPoint(dataJson.x, dataJson.y, dataJson.color);
    };

    var connected = false;
    
    canvas.mousemove(function (e) {
        if (buttonPressed && connected) {
            var coordenates = "{ \"x\": \"" + Math.round(e.offsetX) + "\", \"y\": \"" + Math.round(e.offsetY) + "\", \"color\": \"" + color +"\"}";
            ws.send(coordenates);
        }
    });

    var drawPoint = function (x, y, color) {
        setPoint(x, y, color);
    };
    var update = function (points) {
        if (!points) return;
        for (var x = 0; x < 300; x++) {
            for (var y = 0; y < 300; y++) {

                if (points[x][y]) {
                    setPoint(x, y, points[x][y]);
                }
            }
        }
    };
});