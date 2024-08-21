import { handleClientStreamingCall, handleServerStreamingCall, handleUnaryCall, sendUnaryData, ServerReadableStream, ServerUnaryCall, ServerWritableStream, ServiceError } from "grpc";
import { IUsersServer } from "../proto/users_grpc_pb";
import { UserRequest, User } from "../proto/users_pb";
import { users } from "./database";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

export class UsersServer implements IUsersServer {
    getUser(call: ServerUnaryCall<UserRequest>, callback: sendUnaryData<User>) {
        const userId = call.request.getId()
        const user = users.find((u: User) => u.getId() === userId)

        if (!user) {
            const error: ServiceError = {
                name: "User Missing",
                message: `User with ID ${userId} not found in database`
            }

            callback(error, null)
            return
        }

        console.log(`getUser: returning user with ID ${userId}`);
        callback(null, user)
    };

    getUsers(call: ServerWritableStream<Empty>) {
        console.log(`getUsers: returning all users of database`);
        for (const user of users) call.write(user);
        call.end()
    }

    createUser(call: ServerReadableStream<Empty>, callback: sendUnaryData<Empty>) {

        let usersCount = 0;
        console.log(`createUser: write a new user in database`);
        call.on('data', (u) => {
            users.push(u)
            usersCount++;
        })

        call.on('end', () => {
            console.log(`createUser: new ${usersCount} created in database`);
            callback(null, new Empty())
        })
    }

    deleteUser(call: ServerUnaryCall<UserRequest>, callback: sendUnaryData<Empty>) {
        const userId = call.request.getId()
        const userIndex = users.findIndex((u: User) => u.getId() === userId)

        if (userIndex === -1) {
            const error: ServiceError = {
                name: "User Missing",
                message: `User with ID ${userId} not found in database`
            }

            callback(error, null)
            return
        }

        users.splice(userIndex, 1);
        console.log(`deleteUser: user with ID ${userId} was removed from database`);
        callback(null, new Empty());
    }
}