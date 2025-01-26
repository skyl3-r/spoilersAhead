import { commentInfo } from "@/app/home/post/[id]/page";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Comment({
  comment,
  username,
}: {
  comment: commentInfo;
  username: string;
}) {
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(comment.commentdate));

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(comment.commentdate));

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this comment?")) {
        const commentid = comment.id;
        try {
            // console.log("delete post");
            const response = await fetch("http://localhost:8000/api/deletecomment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ commentid }),
            });
  
            if (response.ok) {
              //   setIsLikedByMe(false)
              window.location.reload();
            } else {
              console.log("something went wrong w deleting this");
            }
          } catch (error) {
            console.error("Error deleting comment:", error);
          }
    }
  }
  return (
    <div className="flex flex-col border border-gray-300 rounded-md p-3 hover:bg-gray-300 text-sm gap-y-1">
      {/* <p>{comment.id}</p>
      <p>{comment.body}</p>
      <p>{comment.commentdate}</p>
      <p>{comment.username}</p> */}
      <p>{comment.body}</p>
      <div className="flex flex-row justify-between items-center">
        <p className="text-gray-600">
          Posted by: {comment.username} on {date} at {time}
        </p>
        {username == comment.username ? (
          <div className="hover:text-gray-500 rounded"
          onClick={handleDelete}>
            <RiDeleteBin6Line className="w-4 h-4" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
