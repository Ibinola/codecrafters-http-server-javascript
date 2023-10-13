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

    // console.log(requestString);


    const request = parseRequest(requestString)
    console.log(request);


    if (request.method === "GET" && request.path === "/") {
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
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

  const [method, path, protocol] = startLines[0].split(" ")

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
