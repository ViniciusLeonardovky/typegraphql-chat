import { Box, Grid } from '@chakra-ui/react';

interface ChatProps {
  roomId: string;
}

const Chat: React.FC<ChatProps> = ({ roomId }) => {
  return (
    <Grid
      width='100%'
      templateColumns='1fr'
      templateRows='3.50rem 1fr 3.50rem'
      templateAreas="
    'title'
    'chat'
    'input'
  "
    >
      <Box gridArea='title' bgColor='orangered'>
        Titulo
      </Box>
      <Box gridArea='chat' bgColor='hotpink'>
        Chatizin
      </Box>
      <Box gridArea='input' bgColor='lightblue'>
        input maneiro
      </Box>
    </Grid>
  );
};

export default Chat;
