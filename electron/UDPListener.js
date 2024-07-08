const dgram = require("dgram");

class UDPListener {
  constructor(mainWindow) {
    this.tcpPort = null
    const socket = dgram.createSocket("udp4");
    socket.on("message", (msg) => {
      try {
        let parsed = JSON.parse("" + msg);
        this.tcpPort = parsed.port
        mainWindow.webContents.send("dataReceived", parsed);
      } catch (e) {}
    });
    socket.bind(42069);
  }
}

module.exports = UDPListener;
