import { BiComment, BiHeart } from "react-icons/bi";
import Link from "next/link";

export type postInfo = {
  id: string;
  postername: string;
  fandomname: string;
  title: string;
  body: string;
  postdate: string;
  commentcount: string;
  likecount: string;
};

export default function Post({ post }: { post: postInfo }) {
  // change later
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(post.postdate));

  return (
    <Link href={`/home/post/${post.id}`} passHref>
      <div className="flex flex-col border border-gray-300 rounded-md p-3 hover:bg-[#9fc2cc]">
        {/* <p>{post.id}</p>
            <p>{post.postername}</p>
            <p>{post.fandomname}</p>
            <p>{post.title}</p>
            <p>{post.body}</p>
            <p>{post.postdate}</p>
            <p>{post.likecount}</p>
            <p>{post.commentcount}</p> */}
        <div className="flex flex-row justify-between">
          {/* title */}
          <p className="font-bold">{post.title}</p>

          <div className="flex flex-row text-gray-600 gap-x-2 text-sm">
            {/* likes and comments */}
            <div className="flex flex-row items-center gap-x-1">
              {post.likecount}
              <BiHeart />
            </div>
            <div className="flex flex-row items-center gap-x-1">
              {post.commentcount}
              <BiComment />
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {/* posted by and fandom */}
          <p>
            Posted: {post.postername} on {date} | Fandom: {post.fandomname}
          </p>
        </div>
        <div className="text-sm">
          {/* body blurb, cut off at 2 lines */}
          <p className="line-clamp-2">{post.body}</p>
        </div>
      </div>
    </Link>
  );
}
