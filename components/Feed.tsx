import { RefreshIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { Comment, Tweet } from "../typings";
import { getComments } from "../utils/getComments";
import { getTweets } from "../utils/getTweets";
import {TweetComponent} from "./Tweet";
import TweetBox from "./TweetBox";
import toast from 'react-hot-toast';
// import { urlFor } from "../sanity";

interface Props {
  tweets: [Tweet];
}

export default function Feed({ tweets: tweetsProp }: Props) {

  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);
  async function handleRefresh() {
  const notification = toast.loading("Refreshing your Tweets...")


    const tweets: Tweet[] = await getTweets();
    setTweets(tweets);

    toast.success("Tweets Refreshed!!", {
      id: notification,
    })
  }
  return (
    <div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon onClick={handleRefresh} className="h-8 w-8 text-twitter cursor-pointer mt-5 mr-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>

      {/* TweetBox */}
      <div>
        <TweetBox setTweets={setTweets}/>
      </div>

      {/* A Tweet */}
      {tweets ? (tweets.map((tweet) => (
        <TweetComponent key={tweet._id} tweet={tweet}/>
      ))): (
        <p>No tweets received from Feed component, check feed component</p>
      )}
    </div>
  );
}
