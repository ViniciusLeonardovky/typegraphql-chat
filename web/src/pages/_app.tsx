import { Provider, createClient } from 'urql';
import ThemeContainer from '../contexts/theme/ThemeContainer';
import { ToastContainer } from 'react-toastify';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ThemeContainer>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} />
      </ThemeContainer>
    </Provider>
  );
}

export default MyApp;
