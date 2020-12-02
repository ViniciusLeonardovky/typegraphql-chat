import { Box, Text } from '@chakra-ui/react';
import { useListAllRoomUsersQuery } from '../generated/graphql';

interface RoomUsers {
  roomId: string;
}

const RoomUsers: React.FC<RoomUsers> = ({ roomId }) => {
  const [{ data: roomUsers, fetching }] = useListAllRoomUsersQuery({
    variables: { room_id: roomId },
  });

  return (
    <Box
      w='350px'
      h='calc(100vh - 6rem)'
      borderLeft='1px'
      borderColor='gray.700'
    >
      {!!fetching ? (
        <p>Carregando...</p>
      ) : (
        <Box>
          {roomUsers?.listAllRoomUsers.map((user) => (
            <Box key={user.id} display='flex' flexDirection='column'>
              <Text>{user.nickname}</Text>
              <Text>{user.status}</Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RoomUsers;
