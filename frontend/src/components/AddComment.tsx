import { noticia } from "@/utils/fonts";
import { useState } from "react";

export default function AddComment({
  username,
  postid,
}: {
  username: string;
  postid: string;
}) {
  const [body, setBody] = useState("");

  const handleSubmit = async () => {
    // console.log("submit");
    // like it
    try {
      const response = await fetch("http://localhost:8000/api/commentpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, postid, body }),
      });

      if (response.ok) {
        window.location.reload();
        // setIsLikedByMe(true)
      } else {
        console.log("something went wrong w commenting this");
      }
    } catch (error) {
      console.error("Error commenting post:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow rounded-2xl">
      <h2
        className={`${noticia.className} font-bold border-b mb-2 pb-2 border-black`}
      >
        Add a Comment
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex mt-2 mb-4 border rounded-lg">
          <textarea
            id="comment"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your comment here..."
            className="flex w-full p-2 rounded-lg text-sm resize-y max-h-48 overflow-auto"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className={`${noticia.className} bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm`}
        >
          Post as {username}
        </button>
      </form>
    </div>
  );
}
