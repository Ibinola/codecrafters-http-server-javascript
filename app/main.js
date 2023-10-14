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


    let response = formatResponse(request.path);
    socket.write(response);
    socket.end();
    // if (request.method === "GET" && request.path === "/") {

    //   const string = request.path.split("/").slice(2).join("/");

    //   const response = `HTTP/1.1 200 OK \r\n\ Content-Type: text/plain\r\n\ Content-Length: ${string.length}\r\n\r\n${string}`;


    //   socket.write(response);
    //   socket.end();
    // } else {
    //   socket.write("HTTP/1.1 404 NOT FOUND\r\n\r\n");
    //   socket.end();
    // }
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

const formatResponse = (path) => {
  let response = 'HTTP/1.1'

  if (path == "/") {
    return response + " 200 OK \r\n\r\n"
  } else if (path.split("/")[1] !== "echo") {
    return response + " 404 NOT FOUND \r\n\r\n";
  }

  response = "HTTP/1.1 200 OK \r\nContent-Type: text/plain\r\n";
  const randomString = path.split("/").slice(2).join("/");
  response += `Content-Length: ${randomString.length}\r\n\r\n${randomString}`;

  return response;
}

server.on('close', () => {
  socket.end();
  socket.close();
})

server.listen(4221, "localhost");
