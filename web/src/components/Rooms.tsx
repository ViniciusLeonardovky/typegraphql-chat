import { Flex, Grid } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import Chat from './Chat';
import Header from './Header';
import RoomUsers from './RoomUsers';
import UserRooms from './UserRooms';

const Rooms: React.FC = ({}) => {
  const [roomId, setRoomId] = useState('');

  const onClickRoom = useCallback((room_id: string): any => {
    setRoomId(room_id);
  }, []);

  return (
    <Grid
      as='main'
      height='100vh'
      templateColumns='350px 1fr 350px'
      templateRows='6rem 1fr'
      templateAreas="
      'header header header'
      'rooms chat users'
    "
    >
      <Flex gridArea='header'>
        <Header />
      </Flex>

      <Flex gridArea='rooms'>
        <UserRooms onClickRoom={onClickRoom} />
      </Flex>

      <Flex gridArea='chat' bgColor='gray.900'>
        <Chat roomId={roomId} />
      </Flex>

      <Flex gridArea='users' bgColor='gray.800'>
        <RoomUsers roomId={roomId} />
      </Flex>
    </Grid>
  );
};

export default Rooms;
