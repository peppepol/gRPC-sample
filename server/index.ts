import { Server, ServerCredentials } from "grpc";
import { UsersService } from "../proto/users_grpc_pb";
import { UsersServer } from "./services";

const server = new Server();

// Services
server.addService(UsersService, new UsersServer())


// Start server
const port = 3000;
const uri = `localhost:${port}`;
console.log(`[Server] Listening on ${uri}`);
server.bind(uri, ServerCredentials.createInsecure());

server.start();