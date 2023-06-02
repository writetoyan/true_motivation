import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  numberOfApproval: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ numberOfApproval: 5 })
}
