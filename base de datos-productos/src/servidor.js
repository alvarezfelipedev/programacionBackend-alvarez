import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

import {router} from './router.js';
import { configurarSocket } from "./manejadorDeNuevasConexiones.js"

const app = express();
export const httpServer = new http.Server(app);
const io = new Server(httpServer);

app.use(express.static("public"));

app.use("/", router);

configurarSocket(io);