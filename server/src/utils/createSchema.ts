import { buildSchema } from 'type-graphql';

import { RegisterUserResolver } from '../modules/user/resolvers/RegisterUserResolver';
import { AuthenticateUserResolver } from '../modules/user/resolvers/AuthenticateUserResolver';
import { ShowUserResolver } from '../modules/user/resolvers/ShowUserResolver';
import { LogoutResolver } from '../modules/user/resolvers/LogoutResolver';
import { ChangeUserStatusResolver } from '../modules/user/resolvers/ChangeUserStatusResolver';

import { CreateRoomResolver } from '../modules/room/resolvers/CreateRoomResolver';
import { ListAllPublicRoomsResolver } from '../modules/room/resolvers/ListAllPublicRoomsResolver';
import { ListAllUserRoomsResolver } from '../modules/room/resolvers/ListAllUserRoomsResolver';
import { JoinPublicRoomResolver } from '../modules/room/resolvers/JoinPublicRoomResolver';
import { JoinPrivateRoomResolver } from '../modules/room/resolvers/JoinPrivateRoomResolver';
import { GenerateInvitePrivateRoomResolver } from '../modules/room/resolvers/GenerateInvitePrivateRoomResolver';
import { ListAllRoomUsersResolver } from '../modules/room/resolvers/ListAllRoomUsersResolver';
import { SendMessageRoom } from '../modules/room/resolvers/SendMessageRoom';

export const createSchema = () =>
  buildSchema({
    resolvers: [
      RegisterUserResolver,
      AuthenticateUserResolver,
      ShowUserResolver,
      LogoutResolver,
      ChangeUserStatusResolver,

      CreateRoomResolver,
      ListAllPublicRoomsResolver,
      ListAllUserRoomsResolver,
      JoinPublicRoomResolver,
      JoinPrivateRoomResolver,
      GenerateInvitePrivateRoomResolver,
      ListAllRoomUsersResolver,
      SendMessageRoom,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
