import type { NextApiRequest, NextApiResponse } from 'next';
import { Movie } from '@/types/movie';
import { Filters } from '@/types/filters';

import movieJson from '@/json/movies.json';

const DEFAULT_MOVIE_LIMIT = process.env.DEFAULT_MOVIE_LIMIT ? parseInt(process.env.DEFAULT_MOVIE_LIMIT) : null;

const toLowerCase = (str: string): string => str.toLowerCase();
const hasGenre = (filterGenres: string[], movieGenres: string[]): boolean => {
  return movieGenres.some((genre) => filterGenres.map(toLowerCase).includes(genre.toLowerCase()));
};

const filterTests = ({ startYear, endYear, genres }: Filters = {}) => (movie: Movie) => {
  if(startYear && movie.year < startYear) return false;
  if(endYear && movie.year > endYear) return false;
  if(genres && !hasGenre(genres, movie.genres)) return false;

  return true;
}

function *movieFilter(array: Movie[], predicate: (arg0:Movie)=>boolean, limit = 0, page = 1) {
  if(!limit || limit > array.length) limit = array.length;
  let skip = (page - 1) * limit;
  let count = 0;
  for(const item of array) {
    if(count >= limit) break;
    if(predicate(item)) {
      if(skip > 0) {
        skip--;
        continue;
      }
      yield item;
      count++;
    }
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Movie[]>) {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : DEFAULT_MOVIE_LIMIT ?? 0;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const movies = Array.from(movieFilter(movieJson, filterTests(req.body), limit, page));

  return res.status(200).json(movies);
}
