import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

export const USERNAME = 'marketdesign';
export const PASSWORD = 'curiousways';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  if (username !== USERNAME || password !== PASSWORD) {
    res.status(401).end();

    return;
  }

  if (typeof process.env.JWT_PRIVATE_KEY !== 'string') {
    throw new Error('JWT_PRIVATE_KEY env var not set');
  }

  const token = jwt.sign({ username: USERNAME }, process.env.JWT_PRIVATE_KEY, {
    algorithm: 'RS256',
  });

  res.status(200).json({ token });
}
