const net = require("net");
const { ipcMain } = require("electron");

class TCPSender {
  constructor(udpListener) {
    ipcMain.on("messageToDcs", (event, msg) => {
      let client = new net.Socket();
      client
        .connect(udpListener.tcpPort, "127.0.0.1", function () {
          client.write(JSON.stringify(msg) + "\n");
        })
        .on("error", (e) => {
          console.log(e);
        });
    });
  }
}

module.exports = TCPSender;
