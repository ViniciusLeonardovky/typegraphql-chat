import { Box } from '@chakra-ui/react';

const Chat: React.FC = ({}) => {
  return (
    <Box
      bgColor='gray.700'
      px={8}
      height={'6rem'}
      ml={'auto'}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
    ></Box>
  );
};

export default Chat;
