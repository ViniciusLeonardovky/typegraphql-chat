import { Box, Grid, Text } from '@chakra-ui/react';
import { useListAllUsersMessagesRoomQuery } from '../generated/graphql';
import Input from './Input';

interface ChatProps {
  roomId: string;
}

const Chat: React.FC<ChatProps> = ({ roomId }) => {
  const [{ data: messagesUsers, fetching }] = useListAllUsersMessagesRoomQuery({
    variables: { room_id: roomId },
  });

  return (
    <Grid
      width='100%'
      templateColumns='1fr'
      templateRows='3.56rem 1fr 3.56rem'
      templateAreas="
    'title'
    'chat'
    'input'
  "
    >
      <Box
        gridArea='title'
        bgColor='gray.800'
        borderBottom='1px'
        borderColor='gray.700'
        paddingX='15px'
        display='flex'
        alignItems='center'
      >
        Titulo
      </Box>

      <Box
        gridArea='chat'
        bgColor='gray.800'
        borderBottom='1px'
        borderColor='gray.700'
      >
        {!roomId ? (
          <p>Chatizin da uol poggers</p>
        ) : fetching ? (
          <p>Carregando...</p>
        ) : (
          <Box paddingX='15px'>
            {messagesUsers?.listAllUsersMessagesRoom.map((message) => (
              <Box key={message.id} fontSize='14px' marginY='10px'>
                <Box
                  width='100%'
                  height='1px'
                  bgColor='gray.700'
                  marginY='5px'
                />
                <Box display='flex' alignItems='center' mb='5px'>
                  <Text color='gray.400'>{message.nickname}</Text>
                  <Text marginLeft='15px' color='gray.600'>
                    {message.created_at}
                  </Text>
                </Box>
                <Text>{message.content}</Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box
        gridArea='input'
        bgColor='gray.800'
        width='100%'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Input
          width='calc(100% - 50px)'
          height='calc(100% - 15px)'
          focusBorderColor='#7dff75'
          fontSize='14px'
        />
      </Box>
    </Grid>
  );
};

export default Chat;
