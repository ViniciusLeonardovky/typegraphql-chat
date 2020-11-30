import {
  Box,
  Heading,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import {
  useListAllPublicRoomsQuery,
  useListAllUserRoomsQuery,
} from '../generated/graphql';
import Button from './Button';
import Input from './Input';

const UserRooms: React.FC = ({}) => {
  const [
    { data: publicRooms, fetching: fetchingPublicRooms },
  ] = useListAllPublicRoomsQuery();
  const [
    { data: allUserRooms, fetching: fetchingUserRooms },
  ] = useListAllUserRoomsQuery();

  return (
    <Box
      w='350px'
      h='calc(100vh - 6rem)'
      borderRight='1px'
      borderColor='gray.700'
    >
      <Box>
        <Text
          textAlign='center'
          borderBottom='1px'
          borderColor='gray.700'
          paddingY='4'
        >
          Salas
        </Text>
        <Tabs paddingY='2' isFitted variant='enclosed'>
          <Box display='flex' justifyContent='space-around'>
            <Tab
              _selected={{
                bg: '#7dff75',
                boxShadow: 'none',
                color: '#000',
              }}
            >
              Públicas
            </Tab>
            <Tab
              _selected={{
                bg: '#7dff75',
                boxShadow: 'none',
                color: '#000',
              }}
            >
              Salas privadas
            </Tab>
            <Tab
              _selected={{
                bg: '#75ff75',
                boxShadow: 'none',
                color: '#000',
              }}
            >
              Criar sala
            </Tab>
          </Box>

          <Box h='1px' w='100%' bgColor='gray.700' />

          <TabPanels>
            <TabPanel>
              {fetchingPublicRooms ? (
                <p>Carregando...</p>
              ) : publicRooms?.listAllPublicRooms[0] ? (
                publicRooms?.listAllPublicRooms.map((room) => (
                  <Box key={room.id}>
                    <Box>
                      <Heading fontSize='1.5rem' color='#fff'>
                        {room.name}
                      </Heading>
                      <Text color='#b8b1b1'>{room.description}</Text>
                    </Box>
                    <Box width='100%' bgColor='#2D3748' h='1px' my='20px' />
                  </Box>
                ))
              ) : (
                <Text>Nenhuma sala encontrada</Text>
              )}
            </TabPanel>
            <TabPanel>
              {fetchingUserRooms ? (
                <p>Carregando...</p>
              ) : allUserRooms?.listAllUserRooms[0] ? (
                allUserRooms?.listAllUserRooms.map((room) => (
                  <Box key={room.id}>
                    <Box>
                      <Heading fontSize='1.5rem' color='#fff'>
                        {room.name}
                      </Heading>
                      <Text color='#b8b1b1'>{room.description}</Text>
                    </Box>
                    <Box width='100%' bgColor='#2D3748' h='1px' my='20px' />
                  </Box>
                ))
              ) : (
                <Box>
                  <Text>Você não está em nenhuma sala :c</Text>
                </Box>
              )}
              <Box mt='6rem'>
                <Text fontSize='0.9rem' mb='5px' color='violet'>
                  Digite abaixo um código válido para entrar em uma sala privada
                </Text>
                <Box
                  w='100%'
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Input
                    placeholder='Código da sala'
                    w='calc(100% - 100px)'
                    variant='flushed'
                    borderRadius='0'
                  />
                  <Button mt='5px' alignContent='end'>
                    Enviar
                  </Button>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default UserRooms;
