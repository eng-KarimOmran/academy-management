import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";

export default function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Input
      type="text"
      className="w-full md:max-w-xs"
      placeholder="بحث..."
      value={search}
      onChange={handleChange}
    />
  );
}
