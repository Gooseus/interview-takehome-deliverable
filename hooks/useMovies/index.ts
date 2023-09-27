import { Filters } from "@/types/filters";
import { Movie } from "@/types/movie";
import { useQuery } from "react-query";

export const fetchMovies = async (filters: Filters): Promise<Movie[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filters)
  });
  return res.json();
}

export const useMovies = (filters: Filters) => {
  return useQuery(
    JSON.stringify(filters),
    () => fetchMovies(filters)
  );
}