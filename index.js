const server = require("./api/server");
const port = process.env.PORT || 5010;
server.listen(port, () => console.log(`== Server running on port ${port} ==`));
