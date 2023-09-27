import { useState } from 'react';
import { fetchFilters } from '@/hooks/useFilters';
import { Filters } from '@/types/filters';

type AIFilterProps = { 
  onFilterChange: (filters: Filters) => void,
  placeholder: string,
  triggerKey: string
};

function LoadingSpinner({ circle, spin, className }: { circle: string, spin: string, className: string }) {
  return <div className={className}>
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke={circle} strokeWidth="4"></circle>
      <path className="opacity-75" fill={spin} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
}

export const AIFilter = ({ onFilterChange, placeholder, triggerKey }: AIFilterProps) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if(event.key === triggerKey) {
      setIsLoading(true);
      const filters = await fetchFilters(event.currentTarget.value);
      onFilterChange(filters);
      setIsLoading(false);
    }
  }

  return <div className="w-3/5 mb-12 relative">
    <input 
      type="text"
      className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
      placeholder={placeholder}
      onKeyUp={handleKeyUp}
      disabled={isLoading}
    />
    {isLoading && (<LoadingSpinner className="absolute top-0 right-0 mt-3 mr-3" circle='#999' spin='#999' />)}
    <span className='text-xs text-gray-400 float-right'>Press Enter to apply AI Filter</span>
  </div>;
};
