'use client'

import EditPost from "@/components/EditPost";
import { DecodedToken } from "@/components/Navbar";
import { jwtDecode } from "jwt-decode";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewEditPost() {
  const params = useParams();
  const { id } = params;

  const [orititle, setTitle] = useState("");
  const [oribody, setBody] = useState("");
  const [orifandom, setFandom] = useState("");
  const [postername, setPostername] = useState("");
  const [postid, setId] = useState("")

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  
  // need to check that username is correct

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp > currentTime) {
          setLoggedIn(true);
          setUsername(decoded.username);
        }
      } catch (err) {
        console.error("Invalid or expired token", err);
      }
    }

    const fetchPost = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/mainpost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();
        // console.log(data);
        setTitle(data.title);
        setBody(data.body);
        setFandom(data.fandomname);
        setPostername(data.postername);
        setId(data.id);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postername]);
  return <div className="flex flex-col p-3 pt-5">
    {username == postername ? <EditPost username={username} postid={postid} orititle={orititle} oribody={oribody} orifandom={orifandom} /> : <p>Please log in to the correct account to edit the post.</p>}
  </div>;
}
