// Import the express module
const express = require('express');

// Call the express function to create an app/server instance
const app = express();

// Define the port number on which the server will listen
const PORT = 3000;

/**
 * GET request handler for the root URL ('/')
 * When the user accesses http://localhost:3000/ with a GET request,
 * this callback will run and send a response.
 */
app.get('/', (req, res) => {
  res.send("Hello World");
});

/**
 * POST request handler for the root URL ('/')
 * When a POST request is made to http://localhost:3000/,
 * this callback will handle the request.
 */
app.post('/', (req, res) => {
  res.send("Hello Earth");
});

/**
 * PUT request handler for updating data
 * When a PUT request is made to http://localhost:3000/,
 * this callback will respond accordingly.
 */
app.put('/', (req, res) => {
  res.send("Updated the resource on Earth 🌍");
});

/**
 * DELETE request handler for deleting data
 * When a DELETE request is made to http://localhost:3000/,
 * this callback will handle it.
 */
app.delete('/', (req, res) => {
  res.send("Deleted the resource from Earth 🌍");
});

/**
 * Start the server and make it listen on the defined port
 * This function will run when the server is successfully started
 */
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});