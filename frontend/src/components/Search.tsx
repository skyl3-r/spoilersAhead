import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

interface Fandom {
  name: string;
}

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [query, setQuery] = useState<string>(searchParams.get("query") || "");
  const [selectedFandoms, setSelectedFandoms] = useState<string[]>(
    searchParams.get("fandom")?.split(",") || []
  );
  const [isAllPoster, setIsAllPoster] = useState<boolean>(
    searchParams.get("isAllPoster") !== "false"
  );

  //   const handleSearch = useDebouncedCallback((term: string) => {
  //     const params = new URLSearchParams(searchParams);
  //     if (term) {
  //       params.set('query', term);
  //     } else {
  //       params.delete('query');
  //     }
  //     params.set('fandom', selectedFandoms.join(','));
  //     params.set('isAllPoster', isAllPoster.toString());
  //     replace(`${pathname}?${params.toString()}`);
  //   }, 300);
  const [fandoms, setFandoms] = useState<Fandom[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/allfandoms")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch top fandoms");
        }
        return response.json();
      })
      .then((data) => setFandoms(data))
      .catch((error) => console.error("Error fetching fandoms:", error));
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    params.set("fandom", selectedFandoms.join(","));
    params.set("isAllPoster", isAllPoster.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const updateQuery = (q: string) => {
    setQuery(q);
  };

  const toggleFandom = (fandom: string) => {
    setSelectedFandoms((prev) =>
      prev.includes(fandom)
        ? prev.filter((item) => item !== fandom)
        : [...prev, fandom]
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => updateQuery(e.target.value)}
          //   defaultValue={searchParams.get('query')?.toString()}
          value={query}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>

      <div className="flex flex-row items-top">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Fandoms
          </label>
          <div className="mt-2 space-y-2">
            {fandoms
              .map((v) => v.name)
              .map((fandom) => (
                <div key={fandom} className="flex items-center">
                  <input
                    type="checkbox"
                    id={fandom}
                    checked={selectedFandoms.includes(fandom)}
                    onChange={() => toggleFandom(fandom)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={fandom}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {fandom}
                  </label>
                </div>
              ))}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAllPoster"
            checked={!isAllPoster}
            onChange={() => setIsAllPoster((prev) => !prev)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="isAllPoster"
            className="ml-2 block text-sm text-gray-700"
          >
            Show only my posts
          </label>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}
