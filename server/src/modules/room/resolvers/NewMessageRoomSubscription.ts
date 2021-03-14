import { Resolver, Subscription, Root } from 'type-graphql';

import { MessageResponse } from './types/MessageResponse';

@Resolver()
export default class NewMessageRoomSubscription {
  @Subscription({
    topics: 'MESSAGE',
  })
  newMessageRoom(@Root() newMessagePayload: MessageResponse): MessageResponse {
    return newMessagePayload;
  }
}
