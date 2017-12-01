function JoinGame() {
    /*
    var payload = {
        userId: 21, //Default cast one on the backend
        : 2
    };

    var data = new FormData();
    data.append( "json", JSON.stringify( payload ) );

    fetch("http://ec2-18-221-200-72.us-east-2.compute.amazonaws.com:8080/joingame", {
        method: "POST",
        body: data
    })
        .then(function(res){ return res.json(); })
        .then(function(data){ alert( JSON.stringify( data ) ) })

        */

    if ("WebSocket" in window) {
        // Let us open a web socket

        var id = document.getElementById("gameId").value
        var url = 'ws://ec2-18-221-200-72.us-east-2.compute.amazonaws.com:3000/game_socket/' + id
        var ws = new WebSocket(url);

        ws.onopen = function() {
            // Web Socket is connected, send data using send()
            ws.send("Message to send");
            alert("Message is sent...");
        };

        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            alert("Message is received...");
        };

        ws.onclose = function() {
            // websocket is closed.
            alert("Connection is closed..."); 
        };

        window.onbeforeunload = function(event) {
            socket.close();
        };
    }
    
    else
    {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
    }
}

