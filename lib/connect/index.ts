import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

export const router = createRouter<NextApiRequest, NextApiResponse>();
