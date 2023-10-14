const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("close", () => {
    socket.end();
    server.close();
  });

  socket.on("data", (buffer) => {

    const requestString = buffer.toString('utf-8');
    const request = parseRequest(requestString)
    console.log(request);



    if (request.method === "GET" && request.path.startsWith("/echo")) {

      const string = request.path.substring(6);

      const response = `HTTP/1.1 200 OK\r\n\Content-Type: text/plain\r\n\Content-Length: ${string.length}\r\n\r\n${string}`;


      socket.write(response);
      socket.end();
    } else {
      socket.write("HTTP/1.1 404 NOT FOUND\r\n\r\n");
      socket.end();
    }
  })


});

const parseRequest = (requestString) => {
  const lines = requestString.split("\r\n")
  const [startLines] = lines;

  const [method, path, protocol] = startLines.split(" ")

  return {
    method,
    path,
    protocol
  }
}

server.on('close', () => {
  socket.end();
  socket.close();
})

server.listen(4221, "localhost");
