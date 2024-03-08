/**
 * Redis and Database status check and collections count
 */
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const getStatus = (req, res) => {
  res.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
};

const getStats = async (req, res) => {
  res.status(200).json({ users: await dbClient.nbUsers(), files: await dbClient.nbFiles() });
};

module.exports = { getStats, getStatus };
