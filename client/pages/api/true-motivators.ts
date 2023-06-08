import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

type Data = {
  message?: string,
  motivatorList?: {},
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {
    const motivatorId = req.body.motivatorId;
    const description = req.body.description;
    const client = await MongoClient.connect(MONGODB_URI!)
    const db = client.db();
    await db.collection('list').insertOne({motivatorId: motivatorId, description: description});
    res.status(201).json({message: 'You successfully created a True Motivator!'})
  } 

  if (req.method === 'GET') {
    const client = await MongoClient.connect(MONGODB_URI!)
    const db = client.db();
    const motivatorList = await db.collection('list').find().toArray();
    res.status(200).json({motivatorList})
  }
}




