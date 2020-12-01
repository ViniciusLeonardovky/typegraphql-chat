import React from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

const Button: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      height='50px'
      backgroundColor='#7dff75'
      borderRadius='sm'
      color='gray.800'
      transition='0.3s'
      _hover={{ textColor: 'white', bgColor: 'gray.500' }}
      {...props}
    />
  );
};

export default Button;
