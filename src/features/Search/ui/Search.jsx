import { Input } from "@shared/ui";

export const Search = ({ searchQuery, setSearchQuery }) => {

  const handleSearchChange = (e) => {
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