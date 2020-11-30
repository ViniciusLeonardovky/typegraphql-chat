import { useRouter } from 'next/router';
import Header from './Header';
import UserRooms from './UserRooms';

const Rooms: React.FC = ({}) => {
  // const router = useRouter();
  return (
    <>
      <Header />
      <div>
        <UserRooms />
      </div>
    </>
  );
};

export default Rooms;
