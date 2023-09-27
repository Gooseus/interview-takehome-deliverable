import { FilterResponse, Filters } from "@/types/filters";
import { useQuery } from "react-query";

export const fetchFilters = async (text: string): Promise<Filters> => {
  if(!text) return {};
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

  const json = await res.json() as FilterResponse;
  if(json.error) {
    throw new Error('Error returning filters from AI');
  }
  return json.filters ?? {};
}

export const useFilters = (text: string) => {
  return useQuery(
    text,
    () => fetchFilters(text)
  );
}