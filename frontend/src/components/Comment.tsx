import { commentInfo } from "@/app/home/post/[id]/page";

export default function Comment({ comment }: { comment: commentInfo }) {
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
  return (
    <div className="flex flex-col border border-gray-300 rounded-md p-3 hover:bg-gray-300 text-sm gap-y-1">
      {/* <p>{comment.id}</p>
      <p>{comment.body}</p>
      <p>{comment.commentdate}</p>
      <p>{comment.username}</p> */}
      <p>{comment.body}</p>
      <p className="text-gray-600">Posted by: {comment.username} on {date} at {time}</p>
    </div>
  );
}
