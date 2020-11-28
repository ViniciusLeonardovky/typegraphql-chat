import { useShowUserQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useIsAuth = () => {
  const [{ data, fetching }] = useShowUserQuery();
  const router = useRouter();
  useEffect(() => {
    if (!fetching && !data?.showUser) {
      // router.replace('/?next=' + router.pathname);
      router.back();
    }
  }, [fetching, data, router]);
};
