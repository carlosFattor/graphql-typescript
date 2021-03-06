import { v4 } from 'uuid';
import { redis } from '../../db/redis';

export const createConfirmationUrl = async (userId: string) => {
  const token = v4();
  redis.set(token, userId, "ex", 60 * 60 * 24);
  const url = `http://localhost:3000/user/confirm/${token}`;
  console.log(url)
  return url;
}