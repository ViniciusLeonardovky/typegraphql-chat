import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useLogoutMutation, useShowUserQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import Button from './Button';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useShowUserQuery({
    pause: isServer(),
  });

  const router = useRouter();

  return (
    <Box
      bgColor='gray.700'
      px={8}
      height={'6rem'}
      ml={'auto'}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
    >
      <Text color='#7dff75' fontSize={'1.4rem'}>
        {data?.showUser?.nickname &&
          `Bem vindo ao chatzin, ${data?.showUser.nickname}`}
      </Text>

      <Button
        onClick={() => {
          logout();
          router.reload();
        }}
        isLoading={logoutFetching}
        variant='link'
        width={'5rem'}
        background='none'
        textColor='white'
      >
        Sair
      </Button>
    </Box>
  );
};

export default Header;
