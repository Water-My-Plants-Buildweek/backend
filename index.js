require("dotenv").config();

const server = require("./api/server");

if (!module.parent) {
  const port = process.env.PORT || 5010;
  server.listen(port, () =>
    console.log(`== Server running on port ${port} ==`)
  );
}

module.exports = server;
