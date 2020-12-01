import { Flex, Grid } from '@chakra-ui/react';
import Header from './Header';
import UserRooms from './UserRooms';

const Rooms: React.FC = ({}) => {
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
        <UserRooms />
      </Flex>

      <Flex gridArea='chat' bgColor='darkorange'>
        <div>chat</div>
      </Flex>

      <Flex gridArea='users' bgColor='blueviolet'>
        <div>users</div>
      </Flex>
    </Grid>
  );
};

export default Rooms;
