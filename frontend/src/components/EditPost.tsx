"use client";

import { noticia } from "@/utils/fonts";
import { useEffect, useState } from "react";
import { Fandom } from "./Search";
import { useRouter } from "next/navigation";

export default function EditPost({ username, postid, orititle, oribody, orifandom }: { username: string, postid: string, orititle: string, oribody: string, orifandom: string }) {
  const router = useRouter();
  const [title, setTitle] = useState(orititle);
  const [body, setBody] = useState(oribody);
  const [selFandom, setSelFandom] = useState(orifandom);
  const [newFandom, setNewFandom] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // console.log("submit");
    // after submit ahoulf go to home
    //
    const trimmed = newFandom.trim();
    // console.log(fandoms.map(v => v.name))
    if (isOtherSelected && trimmed == "Others") {
      alert("Fandom name is not allowed to be 'Others'.");
    } else if (isOtherSelected && fandoms.map(v => v.name).includes(trimmed)) {
        alert("Fandom in 'Other:' already exists.")
    } else if (isOtherSelected && trimmed == "") {
        alert("Fandom in 'Other:' cannot be empty.")
    } else if (title == "" || body == "" || selFandom == "") {
        alert("Please fill in all fields.")
    } else {
      try {
    console.log(title, body, selFandom, trimmed);

        const response = await fetch("http://localhost:8000/api/editpost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postid, title, body, selFandom, trimmed }),
        });


        if (response.ok) {
        //   window.location.reload();
          // setIsLikedByMe(true)
          router.push('/home')
        } else {
          console.log("something went wrong w editting this");
        }
      } catch (error) {
        console.error("Error editing post:", error);
      }
    }
  };

  const handleFandomChange = (fandom: string) => {
    setSelFandom(fandom);
    if (fandom === "Others") {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
    }
  };

  return (
    <div>
      <p className={`${noticia.className} border-b mb-2 pb-2 border-black`}>
        Edit a Post
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 ">
            Fandom:
          </label>
          <div className="rounded-md bg-neutral-200 p-3">
            <div className="space-y-2 max-h-24 overflow-y-auto">
              {fandoms
                .map((v) => v.name)
                .map((fandom) => (
                  <div key={fandom} className="flex items-center">
                    <input
                      type="radio"
                      id={fandom}
                      name="fandom"
                      checked={selFandom === fandom} // Change logic to match one selected fandom
                      onChange={() => handleFandomChange(fandom)} // Update the selected fandom
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <label
                      htmlFor={fandom}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {fandom}
                    </label>
                  </div>
                ))}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="others"
                  name="fandom"
                  checked={isOtherSelected}
                  onChange={() => handleFandomChange("Others")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <label
                  htmlFor="others"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Other:
                </label>
              </div>
              {isOtherSelected && (
                <div className="flex mt-2">
                  <input
                    type="text"
                    value={newFandom}
                    onChange={(e) => setNewFandom(e.target.value)}
                    className="text-sm w-full p-2 rounded-md"
                    placeholder="Enter fandom name"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block mt-2 text-sm font-medium text-gray-700 ">
            Title:
          </label>
          <div className="flex mb-4 border rounded-lg">
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Type title here..."
              className="flex w-full p-2 rounded-lg text-sm overflow-auto"
            />
          </div>
        </div>
        <div>
          <label className="block mt-2 text-sm font-medium text-gray-700 ">
            Body:
          </label>
          <div className="flex mb-4 border rounded-lg">
            <textarea
              id="comment"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type post here..."
              className="flex w-full p-2 rounded-lg text-sm resize-y max-h-48 overflow-auto"
              rows={5}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`${noticia.className} bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm`}
        >
          Update and repost 
        </button>
      </form>
    </div>
  );
}
