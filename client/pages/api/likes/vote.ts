import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
require('dotenv').config();

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
    const client = await MongoClient.connect(`mongodb+srv://${process.env.NAME}:${process.env.PW}@${process.env.CLUSTER}.d3ycmf8.mongodb.net/motivators?retryWrites=true&w=majority`)
    const db = client.db();
    await db.collection(`challenge${motivatorId}`).insertOne({motivatorId: motivatorId, name: name, liked: liked});
    res.status(201).json({message: 'You successfully liked!'})
  } 

}



