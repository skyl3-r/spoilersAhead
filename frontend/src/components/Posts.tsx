// import Pagination from "./Pagination"
// import Search from "./Search"
// import Post from "./Post"

// export default function Posts({
//     query,
//     currentPage,
// }: {
//     query: string;
//     currentPage: number;
// }) {

//     return (
//         <div className="flex flex-col p-3">
//             <p className={`${kaushan.className} text-xl`}>Recent Posts</p>
//             {/* search bar here to search by title, only show specific fandoms, only by specific posters(me or all) */}

//             {/* post blurb display */}

//         </div>
//     )
// }

"use client";

import { kaushan } from "@/utils/fonts";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Search from "./Search"; // Adjust path based on your directory structure
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "./Navbar";
import Post from "./Post";

export interface Post {
  id: string;
  postername: string;
  fandomname: string;
  title: string;
  body: string;
  postdate: string;
  commentcount: string;
  likecount: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [username, setUsername] = useState("ANONYMOUSUSER");
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp > currentTime) {
          setUsername(decoded.username);
        }
      } catch (err) {
        console.error("Invalid or expired token", err);
      }
    }

    const fetchPosts = async () => {
      const query = searchParams.get("query") || "";
      const fandoms = searchParams.get("fandom") || "";
      const processedFandoms = fandoms.split(",");
      const isAllPoster = searchParams.get("isAllPoster") !== "false";
      const user = username;
    //   console.log(query, processedFandoms, isAllPoster, user);

      try {
        // const response = await fetch(
        //   `http://localhost:8000/api/posts?query=${encodeURIComponent(query)}&fandom=${encodeURIComponent(
        //     fandom
        //   )}&isAllPoster=${isAllPoster}&user=${user}`
        // );

        const response = await fetch("http://localhost:8000/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, fandoms, user, isAllPoster }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [searchParams]); // Refetch whenever search parameters change

  return (
    <div className="flex flex-col p-3">
      <p className={`${kaushan.className} text-xl pb-2`}>Recent Posts</p>
      {/* Search Component */}
      <Search placeholder="Search by title..." />

      {/* Posts List */}
      <div className="grid grid-cols-1 gap-4 pt-4">
        {posts != null ? (
          posts.map((post) => (
            // <div key={post.id} className="p-4 bg-white rounded shadow">
            //   <h3 className="text-lg font-bold">{post.title}</h3>
            //   <p className="text-sm text-gray-500">By {post.postername} in {post.fandomname}</p>
            //   <p className="text-sm">{post.body}</p>
            //   <p className="text-xs text-gray-400">Posted on {new Date(post.postdate).toLocaleDateString()}</p>
            // </div>
            <Post key={post.id} post={post} />
          ))
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}
