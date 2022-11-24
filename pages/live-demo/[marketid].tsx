import { useState } from 'react';

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import axios from 'axios';
import useSWR from 'swr';

import { getAllMarkets, getMarket } from '@/utils/demo';
import { Bidder, Data, MarketData, Role } from '@/types/demo';

import SideBar from '@/components/demo/sidebar/SideBar';
import MainContent from '@/components/demo/Main/MainContent';

// API call function using axios
const fetcher = (url: string, bidders: Bidder[]) =>
  axios.post(url, { free_disposal: true, bidders }).then((res) => {
    return res.data as Data;
  });

const Market: NextPage<{ market: MarketData }> = ({ market }) => {
  const [bidders, setBidders] = useState<Bidder[]>(market.states[0].bidders);
  const [result, setResult] = useState<Data | undefined>();
  const [role, setRole] = useState<Role>();
  const [roldeId, setRoldeId] = useState('');
  // Controls result data fetching
  const [shouldFetch, setShouldFetch] = useState(false);

  const solveMarket = () => {
    setShouldFetch(true);
  };

  // API call using SWR
  const url = 'https://marketdesign.herokuapp.com/solve/lindsay2018';

  // eslint-disable-next-line no-empty-pattern
  const {} = useSWR([shouldFetch ? url : null, bidders], fetcher, {
    onSuccess(data) {
      setShouldFetch(false);
      setResult(data);
      // Replace bidders array with the one from the result
      setBidders(data?.problem.bidders);
    },
  });

  return (
    <main>
      <div className="flex items-stretch font-poppins relative border-t border-green-dark min-h-screen">
        <SideBar
          bidders={bidders}
          solveMarket={solveMarket}
          updateBidders={setBidders}
          role={role}
          roleId={roldeId}
        />
        <MainContent
          loading={shouldFetch}
          result={result}
          bidders={bidders}
          role={role}
          roleId={roldeId}
          setRole={setRole}
          setRoleId={setRoldeId}
          market={market}
          updateBidders={setBidders}
        />
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const content = getMarket(params?.marketid as string, 'data/demo');

  return {
    props: { market: content },
    revalidate: 3600, // revalidate every hour
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllMarkets('data/demo').map((marketid) => ({
    params: { marketid },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Market;
