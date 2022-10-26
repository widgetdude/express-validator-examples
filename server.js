require("util").inspect.defaultOptions.depth = null;
const http = require("http");
const app = require("./app/app");

const port = process.env.PORT || 8080;

const server = http.createServer(app);

const startServer = async () => {
  try {
    server.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
