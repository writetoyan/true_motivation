import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
require('dotenv').config();

type Data = {
  message?: string
  likes?: number
  dislikes?: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {
    const name = req.body.name;
    const liked = req.body.liked;
    const client = await MongoClient.connect(`mongodb+srv://${process.env.NAME}:${process.env.PW}@${process.env.CLUSTER}.1qobaac.mongodb.net/votes?retryWrites=true&w=majority`)
    const db = client.db();
    await db.collection('likes').insertOne({name: name, liked: liked});
    res.status(201).json({message: 'You successfully liked!'})
  } 

  if (req.method === 'GET') {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.NAME}:${process.env.PW}@${process.env.CLUSTER}.1qobaac.mongodb.net/votes?retryWrites=true&w=majority`)
    const db = client.db();
    const votes = await db.collection('likes').find().toArray();
    const likes = votes.filter((vote) => vote.liked === true);
    const dislikes = votes.filter((vote) => vote.liked === false);
    const numberOfLikes = likes.length;
    const numberOfDislikes = dislikes.length;
    res.status(200).json({ likes: numberOfLikes, dislikes: numberOfDislikes })
  }
}



