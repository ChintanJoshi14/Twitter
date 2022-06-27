import React, { useEffect, useState } from "react";
import { Comment, CommentBody, Tweet } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { getComments } from "../utils/getComments";
import toast from "react-hot-toast";
interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  // console.log("from tweet component: ", tweet);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [input, setInput] = useState("");
  const { data: session } = useSession();

  const refreshComments = async () => {
    const commentList: Comment[] = await getComments(tweet._id);
    setComments(commentList);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  async function handleComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const notification = toast.loading('Posting comment..')
  const commentInfo: CommentBody = {
    comment: input,
    username: session?.user?.name || "Unknown user",
    profileImg: session?.user?.image || "https://links.papareact.com/gll",
    tweetId: tweet._id,
  }
    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(commentInfo),
      method: 'POST',
    })

    toast.success("Comment Posted!", {
      id: notification,
    })


    setInput('');
    setCommentBoxVisible(false);
    refreshComments();
  }

  return (
    <div key={tweet._id} className="flex flex-col space-x-3 border-y p-5 bord er-gray-100">
      <div className="flex space-x-3">
        <img
          className="rounded-full h-10 w-10 object-cover"
          src={tweet.profileImg}
          alt="this is profile image"
        />
        {/* name will appear here using session object */}
        {/* <h1>name here</h1> */}
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 hover:underline hover:text-twitter cursor-pointer  sm:inline">
              @{tweet.username.replaceAll(/\s+/g, "").toLowerCase()}
            </p>

            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p>{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              alt="this is tweet image"
              className="m-5 ml-0 mb-1 max-h-60 shadow-sm object-cover rounded-lg"
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div
          onClick={() =>
            session
              ? setCommentBoxVisible(!commentBoxVisible)
              : toast.error("Please Sign In to comment!!", {
                icon: "🅧",
                  style: {
                    color: "#00ADED",
                  },
                })
          }
          className="h-5 w-5 flex text-gray-400 items-center space-x-1 cursor-pointer transition-transform duration-150 ease-out hover:scale-125 hover:text-twitter"
        >
          <ChatAlt2Icon className="shrink-0" />
          <p>{comments.length}</p>
        </div>
        <div className="h-5 w-5 flex text-gray-400 items-center space-x-3 cursor-pointer transition-transform duration-150 ease-out hover:scale-125 hover:text-green-500">
          <SwitchHorizontalIcon />
        </div>
        <div className="h-5 w-5 flex text-gray-400 items-center space-x-3 cursor-pointer hover:text-pink-400 transition-transform duration-150 ease-out hover:scale-125">
          <HeartIcon />
        </div>
        <div className="h-5 w-5 flex text-gray-400 items-center space-x-3 cursor-pointer transition-transform duration-150 ease-out hover:scale-125 hover:text-twitter">
          <UploadIcon />
        </div>
      </div>

      {commentBoxVisible && (
        <form onSubmit={handleComment} className="flex mt-3 space-x-3">
          <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="bg-gray-100 p-2 rounded-lg flex-1 outline-none" type="text" placeholder="Write a comment" />
          <button type="submit" disabled={!input} className="px-4 py-1 rounded-full bg-twitter text-white font-bold disabled:bg-gray-100 disabled:text-gray-300">Post</button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute border-x border-twitter/30 left-5 top-10 h-8" />

              <img
                className="mt-2 h-7 w-7 rounded-full object-cover"
                src={comment.profileImg}
                alt=""
              />

              <div>
                <div className="flex items-center space-x-2">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 hover:underline hover:text-twitter cursor-pointer  sm:inline">
                    @{comment.username.replaceAll(/\s+/g, "").toLowerCase()}
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { Tweet as TweetComponent };
