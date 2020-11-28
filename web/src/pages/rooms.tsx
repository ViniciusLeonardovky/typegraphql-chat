import { useRouter } from 'next/router';
import Header from '../components/Header';
import { useIsAuth } from '../utils/useIsAuth';

const Rooms: React.FC = ({}) => {
  useIsAuth();
  // const router = useRouter();
  return (
    <>
      <Header />
      <div>
        <h1>aasd</h1>
      </div>
    </>
  );
};

export default Rooms;
