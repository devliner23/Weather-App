import { useRef, KeyboardEvent } from 'react';

interface CityInputProps {
  index: number;
  handleUpdateCityName: (index: number, newName: string) => void;
}

const CityInput = ({ index, handleUpdateCityName }: CityInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Return') {
      if (inputRef.current) {
        handleUpdateCityName(index, inputRef.current.value);
      }
    }
  };

  return (
    <input
      type="text"
      placeholder="Enter new city name"
      className="p-1 border border-blue-500"
      ref={inputRef}
      onKeyDown={handleKeyDown}
    />
  );
};

export default CityInput;