
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'utils/source.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.status(201).send(fileContent);
  } 

}



