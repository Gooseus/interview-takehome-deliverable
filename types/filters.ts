export type FilterResponse = {
  filters?: Filters;
  error: boolean; // If the prompt is not parseable, set this to true
};

// If a specific year is specified, startYear === endYear
export type Filters = {
  startYear?: number; // Start year, inclusive
  endYear?: number; // End year, inclusive
  // IMPORTANT: If genres is specified, it MUST be a valid genre
  // One of the following:
  // action, adventure, animated, biography, comedy, crime, documentary, drama, family, fantasy, found footage, historical, horror, independent, martial arts, musical, mystery, noir, political, romance, science fiction, short, silent, slasher, sport, sports, spy, superhero, supernatural, teen, thriller, war, western
  genres?: string[]; 
};
