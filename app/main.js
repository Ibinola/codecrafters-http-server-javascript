const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  // socket.on("close", () => {
  //   socket.end();
  //   server.close();
  // });

  socket.on("data", (buffer) => {

    const requestString = buffer.toString('utf-8');

    console.log(requestString);


    const request = parseRequest(requestString)


    if (request.path === "/") {
      socket.write("200 OK")
    } else {
      socket.write("404 NOT FOUND");
    }
  })
  // socket.write(`HTTP/1.1 200 OK\r\n\r\n`, () => {
  //   socket.end();
  //   server.close();
  // })
});

const parseRequest = (requestString) => {

  const [method, path, protocol] = requestString.split(" ")

  return {
    method,
    path,
    protocol
  }
}





server.listen(4221, "localhost");
