import Image from 'next/image';
import { fetchMovie, useMovie } from '@/hooks';
import { Movie } from '@/types/movie';
import { Inter } from 'next/font/google';
import router from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export async function getStaticProps(context: { params: { id: string; }; }) {
  const movie: Movie = await fetchMovie(context.params.id);
  return {
    props: {
      movie,
    }
  };
}

export async function getStaticPaths() {
  const movies: Movie[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`).then((res) => res.json());
  const paths = movies.map((movie) => {
    return {
      params: {
        id: movie.slug,
      }
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default function MoviePage(props: { movie: Movie; }) {
  const genres = props.movie.genres.sort().map((genre, index) => {
    return (
      <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{genre}</span>
    );
  });
  return (
    <main className={`flex min-h-screen flex-col items-center justify-start px-24 py-12 ${inter.className}`}>
      <h1 className="text-4xl font-bold text-center pb-2">{props.movie.title} ({props.movie.year})</h1>
      <div className="flex flex-row pb-8">
        {genres}
      </div>
      <div className="flex flex-row">
        <div className="basis-1/4">
          <Image
            src={props.movie.thumbnail}
            alt={`"${props.movie.title}" movie poster`}
            width={props.movie.thumbnail_width}
            height={props.movie.thumbnail_height}
            className='h-auto max-w-lg ml-auto'
          />
        </div>
        <div className='basis-1/2 items-center text-right ml-4'>
          <p className="p-3 mb-4 bg-white">{props.movie.description}</p>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => router.push('/')}>Back to Movies</button>
        </div>
      </div>
    </main>
  );
}