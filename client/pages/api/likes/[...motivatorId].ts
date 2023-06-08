import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

type Data = {
  message?: string
  likes?: number
  dislikes?: number
  numberOfLikes?: number
  numberOfDislikes?: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
        const motivatorId = req.query.motivatorId;
        const client = await MongoClient.connect(MONGODB_URI!)
        const db = client.db();
        const votes = await db.collection(`challenge${motivatorId}`).find().toArray();
        const likes = votes.filter((vote) => vote.liked === true);
        const dislikes = votes.filter((vote) => vote.liked === false);
        const numberOfLikes = likes.length;
        const numberOfDislikes = dislikes.length;
        res.status(200).json({ numberOfLikes, numberOfDislikes })
      }
    }