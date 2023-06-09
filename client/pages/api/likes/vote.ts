import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

type Data = {
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {
    const motivatorId = req.body.motivatorId;
    const name = req.body.name;
    const liked = req.body.liked;
    const client = await MongoClient.connect(MONGODB_URI!)
    const db = client.db();
    await db.collection('votes').insertOne({motivatorId: motivatorId, name: name, liked: liked});
    res.status(201).json({message: 'You successfully liked!'})
  } 

}



