import { Box, Flex, Grid, Heading, Image, Link } from '@chakra-ui/react';
import Input from '../components/Input';
import Button from '../components/Button';
import NextLink from 'next/link';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAuthenticateUserMutation } from '../generated/graphql';

export default function Home() {
  const [, authenticateUser] = useAuthenticateUserMutation();

  const router = useRouter();

  return (
    <Grid
      as='main'
      height='100vh'
      templateColumns='1fr 480px 480px 1fr'
      templateRows='1fr 480px 1fr'
      templateAreas="
        '. . . .'
        '. title form .'
        ' . . . .'
      "
      justifyContent='center'
      alignItems='center'
    >
      <Flex gridArea='title' flexDir='column' alignItems='flex-start'>
        <Heading size='2xl' lineHeight='shorter'>
          Vem pro bate papo da uol hehehe
        </Heading>
        <Image
          src='https://i.pinimg.com/originals/fe/af/17/feaf17dabcdc302b028189f0ea595f9b.png'
          alt='Kappa'
          style={{ width: 100, height: 100 }}
          alignSelf='center'
        />
      </Flex>

      <Flex
        gridArea='form'
        height='100%'
        backgroundColor='gray.700'
        borderRadius='md'
        flexDir='column'
        alignItems='stretch'
        padding={16}
      >
        <Heading mb={8} alignSelf='center'>
          Entrar no chatzin
        </Heading>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await authenticateUser(values);
            if (response.error?.message) {
              return toast.error('E-mail ou senha incorretos');
            } else if (response.data.authenticateUser.id) {
              // worked

              if (typeof router.query.next === 'string') {
                router.push(router.query.next);
              } else {
                router.push('/rooms');
              }
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Box mt={1}>
                <Input
                  placeholder='E-mail'
                  type='email'
                  name='email'
                  onChange={handleChange}
                  value={values.email}
                />
              </Box>
              <Box mt={1}>
                <Input
                  placeholder='Senha'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  value={values.password}
                />
              </Box>
              <Button
                mt={3}
                type='submit'
                alignSelf='stretch'
                width='100%'
                isLoading={isSubmitting}
              >
                Entrar
              </Button>
            </form>
          )}
        </Formik>
        <NextLink href='/register'>
          <Link ml='auto' mt={3}>
            Criar conta
          </Link>
        </NextLink>
      </Flex>
    </Grid>
  );
}
