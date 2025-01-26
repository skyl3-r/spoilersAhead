'use client'

import AddPost from "@/components/AddPost";
import { DecodedToken } from "@/components/Navbar";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function NewPost() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

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
  }, []);

  return (
    <div className="flex flex-col p-3 pt-5">
      {isLoggedIn ? <AddPost username={username}/> : <p>Please log in to create a post.</p>}
    </div>
  );
}
