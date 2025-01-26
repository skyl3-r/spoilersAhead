"use client"
import { BiComment, BiHeart, BiSolidHeart } from "react-icons/bi";
import { postInfo } from "./Post";
import { useEffect, useState } from "react";
import { DecodedToken } from "./Navbar";
import { jwtDecode } from "jwt-decode";
import AddComment from "./AddComment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function Mainpost({ post, isLoggedIn, username }: { post: postInfo, isLoggedIn: boolean, username: string }) {
    const router = useRouter();
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(post.postdate));

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(post.postdate));

  
  const [isLikedbyme, setIsLikedByMe] = useState(false);
  const [showAC, setShowAC] = useState(false);
  useEffect(() => {

    const fetchLikedbyme = async () => {
      const postid = post.id;
      if (postid == "") {
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:8000/api/checkuserlike",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, postid }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch liked by me");
        }

        const data = await response.json();
        // console.log(data == "true");
        setIsLikedByMe(data == "true");
        // console.log(isLikedbyme)
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };
    fetchLikedbyme();
    // console.log(isLikedbyme)
  }, [post, isLikedbyme]);

  const handleLike = async () => {
    const postid = post.id;
    if (isLoggedIn) {
      if (isLikedbyme) {
        // need to unlike it
        try {
          console.log("unlike");
          const response = await fetch("http://localhost:8000/api/unlikepost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, postid }),
          });

          if (response.ok) {
            //   setIsLikedByMe(false)
            window.location.reload();
          } else {
            console.log("something went wrong w unliking this");
          }
        } catch (error) {
          console.error("Error unliking post:", error);
        }
      } else {
        // like it
        try {
          const response = await fetch("http://localhost:8000/api/likepost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, postid }),
          });

          if (response.ok) {
            window.location.reload();
            // setIsLikedByMe(true)
          } else {
            console.log("something went wrong w liking this");
          }
        } catch (error) {
          console.error("Error liking post:", error);
        }
      }
    } else {
      alert("Please log in to like the post.");
    }
  };

  const handleComment = () => {
    if (isLoggedIn) {
      setShowAC(!showAC);
      //   console.log("dsgfd")
    } else {
      alert("Please log in to comment on the post.");
    }
  };

  return (
    <div>
      <div className="flex flex-col bg-[#9fc2cc] p-3 rounded-md gap-y-1">
        {/* <p>{post.id}</p>
            <p>{post.postername}</p>
            <p>{post.fandomname}</p>
            <p>{post.title}</p>
            <p>{post.body}</p>
            <p>{post.postdate}</p>
            <p>{post.likecount}</p>
            <p>{post.commentcount}</p> */}
        <p className="font-bold">{post.title}</p>
        <div className="text-gray-600 text-sm">
          <p>
            Posted by: {post.postername} on {date} at {time}
          </p>
          <p>Fandom: {post.fandomname}</p>
        </div>
        <p className="text-sm">{post.body}</p>
      </div>
      <div className="flex flex-row justify-between py-2">
        <div className="flex flex-row text-gray-600 px-2 ">
          {/* likes and comments */}
          <div
            className="flex flex-row items-center gap-x-1 hover:bg-[#9fc2cc] rounded-lg p-1"
            onClick={handleLike}
          >
            {post.likecount}
            {isLikedbyme ? <BiSolidHeart /> : <BiHeart />}
          </div>
          <div
            className="flex flex-row items-center gap-x-1 hover:bg-[#9fc2cc] rounded-lg p-1"
            onClick={handleComment}
          >
            {post.commentcount}
            <BiComment />
          </div>
        </div>

        {username == post.postername ? <PostControls post={post} router={router}/> : ""}
      </div>
      {showAC ? <AddComment username={username} postid={post.id} /> : <p></p>}
    </div>
  );
}

export function PostControls({ post, router }: { post: postInfo, router:AppRouterInstance }) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
        const username = "";
        const postid = post.id;
        try {
            // console.log("delete post");
            const response = await fetch("http://localhost:8000/api/deletepost", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, postid }),
            });
  
            if (response.ok) {
              //   setIsLikedByMe(false)
            //   window.location.reload();
            router.push("/home")
            } else {
              console.log("something went wrong w deleting this");
            }
          } catch (error) {
            console.error("Error deleting post:", error);
          }
    }
  }
  return (
    <div className="flex flex-row gap-x-2">
      <Link
        href={`/home/post/edit/${post.id}`}
        className="flex flex-row rounded-md items-center bg-neutral-300 text-sm px-4 py-2 hover:bg-neutral-400 gap-x-1"
      >
        Edit post
      </Link>
      <p className="flex flex-row rounded-md items-center bg-neutral-300 text-sm px-4 py-2 hover:bg-neutral-400 gap-x-1"
      onClick={handleDelete}>
        Delete post
      </p>
    </div>
  );
}
