import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { createSockets } from "./src/utils/socket.js";
import routes from "./routes/index.js";
import { initalizeFirebase } from "./Utils/firebase.js";


const app = express();

app.use(cors());
app.use(express.json());


app.use(routes);

const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

initalizeFirebase();

createSockets(httpServer);
httpServer.listen(PORT, () => {console.log("server is running ")});