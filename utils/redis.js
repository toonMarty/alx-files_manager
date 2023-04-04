import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor () {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });
    this.client.on('connect', () => {
      console.log('connected');
    });
  }

  isAlive () {
    return this.client.connect;
  }

  async get (key) {
    const value = await this.getAsync(key);
    return value;
  }

  async set (key, value, duration) {
    this.client.setEx(key, duration, value);
  }

  async del (key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
