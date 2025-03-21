import { FormEvent, useEffect, useRef, useState } from 'react';

interface SearchBarProps {
  onSelectMovie: (searchTerm: string) => void;
}

function SearchBar({ onSelectMovie }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Handle form submission for complete search
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSelectMovie(searchTerm);
    }
  };

  // Click outside handler to close recommendations
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        // Only reset UI, don't call onSelectMovie with empty string
        // onSelectMovie('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onSelectMovie]);

  return (
    <div className="search-container" ref={searchContainerRef}>
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
