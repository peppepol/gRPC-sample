import { User, UserStatus } from '../proto/users_pb';
import {allUsers, createNewUsers, getUsers} from './services'

async function run() {
    const user = await getUsers(1);
    console.log(user.toString());
  
    const jim = new User();
    jim.setName("Jim");
    jim.setAge(10);
    jim.setId(20);
    jim.setStatus(UserStatus.OFFLINE);
    createNewUsers([jim]);
    console.log(`\nCreated user ${jim.toString()}`);
  
    const users = await allUsers();
    console.log(`\nListing all ${users.length} users`);
    for (const user of users) {
      console.log(user.toString());
    }
  }
  
  run();