const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {


  socket.on("data", (buffer) => {

    const requestString = buffer.toString('utf-8');

    console.log(requestString);


    const request = parseRequest(requestString)


    if (request.path === "/") {
      socket.write("HTTP/1.1 200 OK \r\n\r\n")
    } else {
      socket.write("HTTP/1.1 404 NOT FOUND \r\n\r\n");
    }

});

const parseRequest = (requestString) => {

  const lines = requestString.split("\r\n");
  const [startLine] = lines;

  const [method, path, protocol] = startLine.split(" ")

  return {
    method,
    path,
    protocol
  }
}





server.listen(4221, "localhost");
