import React, { useRef, useState } from "react";
import {
  PhotographIcon,
  SearchCircleIcon,
  EmojiHappyIcon,
  CalendarIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { Tweet, TweetBody } from "../typings";
import toast from "react-hot-toast";
import { getTweets } from "../utils/getTweets";

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
}

export default function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>("");
  const [imageIconStatus, setImageIconStatus] = useState<Boolean>(false);
  const [image, setImage] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  // to manage tweet button status

  function addImageToTweet(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    if (!imageRef.current?.value) return;

    setImage(imageRef.current.value);
    imageRef.current.value = "";
    setImageIconStatus(false);
  }

  async function postTweet() {
    const notification = toast.loading("Posting Tweet..")
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || "unknown user",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
      image: image,
    }


    const result = await fetch('/api/addTweet', {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })

    const json = await result.json();

    //to fetch the updated list of tweets:
    const newListOfTweets = await getTweets();
    setTweets(newListOfTweets)

    toast.success("Tweet Posted", {
      id: notification,
    })

    //not sure why we returned json
    return json
  }

  function handleSubmit(event:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()
    postTweet();
    setInput("");
    setImage('');
    setImageIconStatus(false);
  }

  return (
    <div className="flex space-x-2 p-5">
      <img
        src={session?.user?.image || "https://links.papareact.com/gll"}
        alt="this is profile logo"
        className="h-14 w-14 rounded-full object-cover mt-4"
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            disabled={!session}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={session ? "What's happening?" : "Sign In to Tweet"}
            className="outline-none h-24 w-full text-xl placeholder:text-xl"
          />
          {session && imageIconStatus && (
            <form className="flex bg-blue-50 items-center max-w-full rounded-md p-2 my-3">
              <input
                ref={imageRef}
                type="text"
                placeholder="Enter Image URL (Optional)"
                className="bg-transparent outline-none p-1 rounded-md placeholder:text-md flex-1"
              />

              <button
                type="submit"
                onClick={addImageToTweet}
                className="px-3 py-1 text-sm text-white font-bold bg-twitter rounded-full disabled:opacity-40"
              >
                Add Image
              </button>
            </form>
          )}

          <div className="flex items-center">
            <div
              onClick={() => {
                !session &&
                  toast.error("Please Sign In to use!", {
                    icon: "🅧",
                    style: {
                      borderRadius: "10px",
                      background: "#fff",
                      color: "#00ADED",
                    },
                  });
              }}
              className="flex flex-1 space-x-2 text-twitter disabled:text-gray-400"
            >
              <PhotographIcon
                onClick={() => setImageIconStatus(!imageIconStatus)}
                className="iconEffects"
              />
              <SearchCircleIcon
                aria-disabled={!session}
                className="iconEffects"
              />
              <EmojiHappyIcon className="iconEffects" />
              <CalendarIcon className="iconEffects" />
              <LocationMarkerIcon className="iconEffects" />
            </div>

            <div>
              <button
              onClick={handleSubmit}
                disabled={!input || !session}
                className="text-white font-bold bg-twitter rounded-full px-5 py-2 disabled:opacity-40"
              >
                Tweet
              </button>
            </div>
          </div>
          {image && (
            <img
              className="mt-10 h-40 w-full object-contain shadow-lg rounded-xl"
              src={image}
              alt="this is tweet image"
            />
          )}
        </form>
      </div>
    </div>
  );
}
