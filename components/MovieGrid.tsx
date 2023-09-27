import router from 'next/router';
import Image from 'next/image';
import { Filters } from '@/types/filters';
import { useMovies } from '@/hooks';

export default function MovieGrid(props: { filters: Filters }) {
  const { isLoading, isError, error, data: movies } = useMovies(props.filters);

  if(isLoading) {
    return <div>Loading...</div>;
  }

  if(isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  let movieCards = (movies ?? []).map((movie, index) => {
    const genres = movie.genres.sort().map((genre, index) => {
      return <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        {genre}
      </span>
    });

    return (
    <div key={index} className="bg-gray-100 cursor-pointer rounded overflow-hidden shadow-lg flex flex-1 flex-col justify-between" onClick={() => router.push(`/movies/${movie.slug}`)}>
      <Image className="w-full" src={movie.thumbnail} alt={`${movie.title} movie poster`} width={movie.thumbnail_width} height={movie.thumbnail_height} />
      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2">{movie.title} ({movie.year})</div>
        <p className="text-gray-700 text-xs">
          {movie.description.slice(0, 100)}{movie.description.length > 100 ? '...' : ''}
        </p>
        <div className="px-6 pt-4 pb-2">{genres}</div>
      </div>
    </div>
    );
  });

  if(!movieCards.length) {
    return (
      <div className="text-center">
        <h2 className='font-bold'>No movies found for the following filters:</h2>
        <pre className='bg-gray-100 text-justify p-4 mt-4'>
          {JSON.stringify(props.filters, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-20">
      {movieCards}
    </div>
  );
}