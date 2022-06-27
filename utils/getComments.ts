import { Comment } from "../typings";

export const getComments = async ( tweetId: string) => {
    const response = await fetch(`/api/fetchComments?tweetId=${tweetId}`)

    const data=await response.json();

    const comments: Comment[] = data.comment;

    return comments;

}