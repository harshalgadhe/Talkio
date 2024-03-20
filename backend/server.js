import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { createSockets } from "./src/utils/socket.js";

const app = express();

app.use(cors());
app.use(express.json());

import routes from "./routes/index.js";
import { log } from "console";
app.use(routes);

const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

createSockets(httpServer);
httpServer.listen(PORT, () => {console.log("server is running ")});