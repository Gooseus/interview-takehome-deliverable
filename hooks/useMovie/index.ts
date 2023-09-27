import { Movie } from "@/types/movie";
import { useQuery } from "react-query";

export const fetchMovie = async (slug: string): Promise<Movie> => {
  const res = await fetch('http://localhost:3000/api/movies/' + slug);
  return res.json();
}

export const useMovie = (slug: string) => {
  return useQuery(
    slug,
    () => fetchMovie(slug)
  );
}