// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TweetBody } from '../../typings'

type Data = {
  message: string
}

export default async function addTweet(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    // take the body section from the request and assign it to 'data'
    const data: TweetBody = JSON.parse(req.body)

    // since, we are creating an api in this page and as the job of api is to get the data from the client request's request body and send it to the backend and since we want to perform mutation, we are taking out the data from the request body and providing it to the mutation object which can have multiple mutations inside it as shown below(in this case we only have a single mutation) 
    const mutations = {
        mutations: [
            {
            create: {
                _type: 'tweet',
                text: data.text,
                username: data.username,
                blockTweet: false,
                profileImg: data.profileImg,
                image: data.image
            }
        }
        ]
    }
    //backend endpoint which will allow mutation or in other words will allow us to create a tweet programatically
    const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`

    //sending a request to the backend along with the mutation object and specifying required headers
    const result = await fetch(apiEndpoint, {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
        },
        body: JSON.stringify(mutations),
        method: 'POST',
    })

    const json = await result.json()


  res.status(200).json({ message: 'Done' })
}
