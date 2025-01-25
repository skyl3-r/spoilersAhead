'use client'

import Comment from '@/components/Comment';
import Mainpost from '@/components/Mainpost';
import { DecodedToken } from '@/components/Navbar';
import { Post } from '@/components/Posts';
import { kaushan } from '@/utils/fonts';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export type commentInfo = {
    id: string,
    body: string,
    commentdate: string,
    username: string
}

export default function PostPage() {
    const params = useParams();
    const {id} = params;

    const [post, setPost] = useState<Post>({
        id: '',
        postername: '',
        fandomname: '',
        title: '',
        body: '',
        postdate: '2025-01-01T00:00:00Z',
        commentcount: '',
        likecount: ''
    })
    const [username, setUsername] = useState("ANONYMOUSUSER");
    const [comments, setComments] = useState<commentInfo[]>([]);

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
            setPost(data);
          } catch (error) {
            console.error("Error fetching post:", error);
          }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/comments", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ id }),
                });
        
                if (!response.ok) {
                  throw new Error("Failed to fetch comments");
                }
        
                const data = await response.json();
                setComments(data);
              } catch (error) {
                console.error("Error fetching comment:", error);
              }
        }
    
        fetchPost();
        fetchComments();
      }, []); 

    if (!id) {
        return <p className='p-3'>Loading...</p>
    }
    return (
        <div className='flex flex-col p-3 pt-5'>
            <Mainpost post={post} />
            <p className={`${kaushan.className} text-xl`}>Comments:</p>
            <div className='flex flex-col p-3 gap-y-3'>
                {comments != null ? 
            comments.map((c) => <Comment key={c.id} comment={c}/>)
        : <p className='text-gray-500'>No comments made.</p>}
            </div>
        </div>
    )
}