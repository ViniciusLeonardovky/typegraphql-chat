import { Provider, createClient } from 'urql';
import ThemeContainer from '../contexts/theme/ThemeContainer';

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
      </ThemeContainer>
    </Provider>
  );
}

export default MyApp;
