// The 'http' module in Node.js allows us to create HTTP servers
const http = require('http');

// Define the port number the server will listen on
const PORT = 3000;

// Create a new HTTP server instance
const server = http.createServer(async (req, res) => {
  // Whenever any request hits the server, this funciton will be called
  console.log("Request Recieved");

  if(req.method == "GET"){
    res.end("GET request recieved");
  } else if(req.method == "POST"){
    // In post request, let's send the response code 201. Default code is 200 in node.js
    res.writeHead(201);
    res.end("POST request request recieved");
  } else {
    res.end("Hello World!");
  }
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
