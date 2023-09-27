import { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query'
import { Inter } from 'next/font/google';

import { Filters } from '@/types/filters';
import { AIFilter } from '@/components/AIFilter';

import { fetchMovies } from '@/hooks';
import MovieGrid from '@/components/MovieGrid';

const inter = Inter({ subsets: ['latin'] });

const initialFilters: Filters = {};

export async function getServerProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: JSON.stringify(initialFilters),
    queryFn: () => fetchMovies(initialFilters),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Home = () => {
  const [ filters, setFilters ] = useState<Filters>(initialFilters);

  const onFilterChange = (filters: Filters) => setFilters(filters);

  if(filters === undefined) {
    return <div>Something went wrong...</div>;
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-start px-24 py-12 ${inter.className}`}>
      <h1 className="text-4xl font-bold text-center pb-12">Ask GPT for Movies</h1>
      <AIFilter onFilterChange={onFilterChange} placeholder='e.g. I want to watch a drama from the 70s...' triggerKey='Enter' />
      <MovieGrid filters={filters} />
    </main>
  )
}

export default Home

