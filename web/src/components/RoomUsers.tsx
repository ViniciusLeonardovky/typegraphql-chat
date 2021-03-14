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
          <Text
            textAlign='center'
            borderBottom='1px'
            borderColor='gray.700'
            paddingY='4'
          >
            Usuários
          </Text>
          <Box maxHeight='calc(100vh - 9.6rem)' overflowY='auto'>
            {roomUsers?.listAllRoomUsers.map((user) => (
              <Box
                key={user.id}
                display='flex'
                alignItems='center'
                mb='0.5rem'
                paddingX='1rem'
                mt='1rem'
              >
                <Text>{user.nickname}</Text>
                <Box
                  marginLeft='1.5rem'
                  height='0.5rem'
                  width='0.5rem'
                  borderRadius='50%'
                  bgColor={user.status === 'online' ? '#75ff75' : '#6d6e6d'}
                  cursor='pointer'
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RoomUsers;
