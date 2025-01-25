import { BiComment, BiHeart } from "react-icons/bi";
import { postInfo } from "./Post";

export default function Mainpost({ post }: { post: postInfo }) {
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
      <div className="flex flex-row text-gray-600 px-2 py-2">
        {/* likes and comments */}
        <div className="flex flex-row items-center gap-x-1 hover:bg-gray-300 rounded-lg p-1">
          {post.likecount}
          <BiHeart />
        </div>
        <div className="flex flex-row items-center gap-x-1 hover:bg-gray-300 rounded-lg p-1">
          {post.commentcount}
          <BiComment />
        </div>
      </div>
    </div>
  );
}
