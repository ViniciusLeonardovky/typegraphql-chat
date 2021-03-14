import { Box, Grid, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useCallback, useEffect, useRef } from 'react';
import {
  useListAllUsersMessagesRoomQuery,
  useSendMessageRoomMutation,
} from '../generated/graphql';
import Input from './Input';

interface ChatProps {
  roomId: string;
}

const Chat: React.FC<ChatProps> = ({ roomId }) => {
  const [{ data: messagesUsers, fetching }] = useListAllUsersMessagesRoomQuery({
    variables: { room_id: roomId },
  });

  const messagesRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [, sendMessage] = useSendMessageRoomMutation();

  const scrollToBottom = useCallback(() => {
    let div = messagesRef.current;

    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  }, [messagesRef]);

  useEffect(() => {
    if (!!messagesUsers?.listAllUsersMessagesRoom[0]) {
      console.log('asd');
      scrollToBottom();
    }
  }, [messagesRef]);

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
        titulo
      </Box>

      <Box
        gridArea='chat'
        bgColor='gray.800'
        borderBottom='1px'
        borderColor='gray.700'
        maxHeight='calc(100vh - 210px)'
        overflowY='auto'
        ref={messagesRef}
        display='flex'
        flexDirection='column-reverse'
      >
        {!roomId ? (
          <p>Chatizin da uol poggers</p>
        ) : (
          // : fetching ? (
          //   <p>Carregando...</p>
          // )
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
        <Formik
          initialValues={{ content: '' }}
          onSubmit={async (values) => {
            await sendMessage({ content: values.content, room_id: roomId });
            values.content = '';
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                height: 'calc(100% - 5px)',
                width: 'calc(100% - 50px)',
              }}
            >
              <Input
                placeholder='Digite sua mensagem'
                name='content'
                focusBorderColor='#7dff75'
                value={values.content}
                onChange={handleChange}
                fontSize='14px'
              />
            </form>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};

export default Chat;
