import {
  Box,
  Heading,
  Select,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import {
  useCreateRoomMutation,
  useListAllPublicRoomsQuery,
  useListAllUserRoomsQuery,
} from '../generated/graphql';
import Button from './Button';
import Input from './Input';

interface UserRoomsProps {
  onClickRoom: (room_id: String) => String;
}

const UserRooms: React.FC<UserRoomsProps> = ({ onClickRoom }) => {
  const [
    { data: publicRooms, fetching: fetchingPublicRooms },
  ] = useListAllPublicRoomsQuery();
  const [
    { data: allUserRooms, fetching: fetchingUserRooms },
  ] = useListAllUserRoomsQuery();
  const [, createRoom] = useCreateRoomMutation();

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
              Suas salas
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
                  <Box
                    key={room.id}
                    cursor='pointer'
                    transition='0.2s'
                    _hover={{
                      bgColor: 'gray.700',
                      borderTopRightRadius: '4px',
                      borderTopLeftRadius: '4px',
                    }}
                  >
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
                  <Box
                    key={room.id}
                    cursor='pointer'
                    transition='0.2s'
                    _hover={{
                      bgColor: 'gray.700',
                      borderTopRightRadius: '4px',
                      borderTopLeftRadius: '4px',
                    }}
                    onClick={() => onClickRoom(room.id)}
                  >
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
              <Heading>Crie uma sala!</Heading>
              <Formik
                initialValues={{ name: '', description: '', type: '' }}
                onSubmit={async (values, { setErrors }) => {
                  if (!values.name || !values.description || !values.type) {
                    return toast.error(
                      'Todos os campos precisam estar preenchidos para criar uma sala',
                      { autoClose: 5000 }
                    );
                  } else {
                    const response = await createRoom(values);

                    if (response.error?.message) {
                      return toast.error(
                        'Ocorreu um erro inesperado. Tente novamente.'
                      );
                    } else if (response.data.createRoom.id) {
                      // worked
                      return toast.success('Sala criada com sucesso!');
                    }
                  }
                }}
              >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                  <form onSubmit={handleSubmit}>
                    <Box mt={1}>
                      <Input
                        placeholder='Nome da sala'
                        type='name'
                        name='name'
                        onChange={handleChange}
                        value={values.name}
                        variant='flushed'
                        borderRadius='0'
                      />
                    </Box>
                    <Box mt={1}>
                      <Input
                        placeholder='Descrição da sala'
                        type='description'
                        name='description'
                        onChange={handleChange}
                        value={values.description}
                        variant='flushed'
                        borderRadius='0'
                      />
                    </Box>
                    <Box mt={1}>
                      <Select
                        height='50px'
                        focusBorderColor='#7dff75'
                        placeholder='Tipo da sala'
                        name='type'
                        onChange={handleChange}
                        value={values.type}
                        variant='flushed'
                      >
                        <option value='public'>Pública</option>
                        <option value='private'>Privada</option>
                      </Select>
                    </Box>
                    <Button
                      mt={3}
                      type='submit'
                      alignSelf='stretch'
                      width='100%'
                      isLoading={isSubmitting}
                    >
                      Criar
                    </Button>
                  </form>
                )}
              </Formik>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default UserRooms;
