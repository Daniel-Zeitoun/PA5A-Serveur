window.onload = function ws_to_back() {
    
    let ws = null

    
    try {
        ws = new WebSocket("wss://pa5a.cyberfilou.fr/rsfront")
    } catch (exception) {
        console.error(exception)
    }
    
    ws.onopen = function(event){
        console.log("[OPEN] Connection established")
        console.log("Sending to server")
        ws.send("Hello i'm the front web")
      //  ws.send(uuid_from_url)
    }
  
    document.forms.publish.onsubmit = function() {
        let outgoingMessage = this.message.value

        ws.send(outgoingMessage)
        return false
    }



    ws.onmessage = function(event) {
        console.log(`[command] Data received from server: ${event.data}`);

        let message = event.data

        let messageElem = document.createElement('div');
        messageElem.textContent = message;
        document.getElementById('messages').prepend(messageElem);
        
    }


    ws.onclose = function(event) {
        if(event.wasClean){
            console.log(`[CLOSE] Connection closed, code=${event.code} reason=${event.reason}`)
         }
        else{
            console.log('[CLOSE] Connection died');
        }
    }

    ws.onerror = function(error) {
        console.log(`[ERROR] ${error.message}`)
    }
}