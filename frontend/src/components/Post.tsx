export type postInfo = {
    id: string,
    postername: string,
    fandomname: string,
    title: string,
    body: string,
    postdate: string
}

export default function Post({post}: {post: postInfo}) {
    // change later
    return (
        <div className="flex flex-col border-2">
            <p>{post.id}</p>
            <p>{post.postername}</p>
            <p>{post.fandomname}</p>
            <p>{post.title}</p>
            <p>{post.body}</p>
            <p>{post.postdate}</p>
        </div>
    )
}