const http = require("http");
// import express app from the app.js file
const app = require("./app");

// pass app as a callback function to http.createServer method
const connectDb = require("./helpers/db");

// this is to enable our http server to listen to incoming http requests
const httpServer = http.createServer(app);

const { PORT } = require("./config/index");

const startServer = async () => {
  await connectDb();
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
startServer()