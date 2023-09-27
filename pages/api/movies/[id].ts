import type { NextApiRequest, NextApiResponse } from 'next';

import movieJson from '@/json/movies.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const movie = movieJson.find((movie) => movie.slug === req.query.id);
  if(!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  return res.status(200).json(movie);
}
