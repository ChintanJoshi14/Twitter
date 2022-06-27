import { Tweet } from "../typings";

export const getTweets = async () => {
 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchTweets`)

 const data = await response.json();

 const tweets: [Tweet] = data.tweet;
//  console.log("from getTweets: ",tweets)
return tweets;
}