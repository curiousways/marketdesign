import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

export const USERNAME = 'marketdesign';
export const PASSWORD = 'curiousways';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  if (typeof process.env.JWT_PRIVATE_KEY !== 'string') {
    throw new Error('JWT_PRIVATE_KEY env var not set');
  }

  if (!token) {
    res.status(401).end();

    return;
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY) as JwtPayload;
  } catch (err) {
    res.status(401).end();

    return;
  }

  if (!decoded?.exp || decoded.exp < new Date().getTime()) {
    res.status(401).end();

    return;
  }

  res.status(200).end();
}
