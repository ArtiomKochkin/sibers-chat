import { Input } from "@shared/ui";

interface Props {
  searchQuery:  string
  setSearchQuery: (searchQuery: string) => void
}

export const Search = ({ searchQuery, setSearchQuery }: Props) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Input 
      placeholder="Search users"
      value={searchQuery}
      onChange={handleSearchChange}
    />
  )
}