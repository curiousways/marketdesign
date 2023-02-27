import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

export const USERNAME = 'marketdesign';
export const PASSWORD = 'meb1djg5rtb.RUQ.pvb';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  if (username !== USERNAME || password !== PASSWORD) {
    res.status(401).end();

    return;
  }

  if (typeof process.env.JWT_PRIVATE_KEY !== 'string') {
    throw new Error('JWT_PRIVATE_KEY env var not set');
  }

  const now = new Date();

  now.setDate(now.getDate() + 1);

  const token = jwt.sign(
    { username: USERNAME, exp: now.getTime() },
    process.env.JWT_PRIVATE_KEY,
    {
      algorithm: 'RS256',
    },
  );

  res.status(200).json({ token });
}
