import { noticia, kaushan } from "@/utils/fonts";
import { useEffect, useState } from "react";

interface Fandom {
  name: string;
  count: number;
}
export default function PopularBanner() {
  const [fandoms, setFandoms] = useState<Fandom[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/fandoms")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch top fandoms");
        }
        return response.json();
      })
      .then((data) => setFandoms(data))
      .catch((error) => console.error("Error fetching fandoms:", error));
  }, []);

  return (
    <div className="flex flex-col bg-[#9fc2cc] p-3">
      <p className={`${kaushan.className} text-xl`}>Popular Now</p>
      <div className="flex flex-row gap-4 mt-2 mb-2">
        {fandoms.map((fandom) => (
          <div
            key={fandom.name}
            className="flex-1 p-4 bg-[#f1ecce] rounded shadow text-center"
          >
            <p className={`${noticia.className} text-md font-bold`}>
              {fandom.name}
            </p>
            {fandom.count == 1 && (
              <p className="text-sm text-gray-500">{fandom.count} post</p>
            )}
            {fandom.count != 1 && (
              <p className="text-sm text-gray-500">{fandom.count} posts</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
